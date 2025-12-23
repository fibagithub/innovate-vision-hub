import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TeamMemberForm } from '@/components/admin/TeamMemberForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  position: string | null;
  position_mn: string | null;
  email: string | null;
  is_active: boolean | null;
  display_order: number | null;
}

const AdminTeamPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<TeamMember | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error('Гишүүд ачаалахад алдаа гарлаа');
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', deleteId);
    
    if (error) {
      toast.error('Устгахад алдаа гарлаа');
    } else {
      toast.success('Амжилттай устгалаа');
      loadMembers();
    }
    setDeleteId(null);
  };

  const openEdit = (member: TeamMember) => {
    setEditData(member);
    setFormOpen(true);
  };

  const openAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground flex items-center gap-3">
            <Users className="w-6 h-6" />
            Багийн гишүүдийн удирдлага
          </h1>
          <p className="text-muted-foreground">Багийн гишүүдийн мэдээллийг удирдах</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Гишүүн нэмэх
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Ачааллаж байна...</div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Гишүүн бүртгээгүй байна
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Албан тушаал</TableHead>
                <TableHead>Имэйл</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Дараалал</TableHead>
                <TableHead className="text-right">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.position_mn || member.position || '-'}</TableCell>
                  <TableCell>{member.email || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={member.is_active ? 'default' : 'secondary'}>
                      {member.is_active ? 'Идэвхтэй' : 'Идэвхгүй'}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.display_order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(member)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <TeamMemberForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editData={editData}
        onSuccess={loadMembers}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Устгахдаа итгэлтэй байна уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Энэ үйлдлийг буцаах боломжгүй.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminTeamPage;
