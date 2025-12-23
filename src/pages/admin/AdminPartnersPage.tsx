import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
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
import { PartnerForm } from '@/components/admin/PartnerForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  partner_type: string | null;
  is_active: boolean | null;
  display_order: number | null;
}

const AdminPartnersPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Partner | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadPartners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error('Хамтрагчид ачаалахад алдаа гарлаа');
    } else {
      setPartners(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', deleteId);
    
    if (error) {
      toast.error('Устгахад алдаа гарлаа');
    } else {
      toast.success('Амжилттай устгалаа');
      loadPartners();
    }
    setDeleteId(null);
  };

  const openEdit = (partner: Partner) => {
    setEditData(partner);
    setFormOpen(true);
  };

  const openAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const getPartnerTypeLabel = (type: string | null) => {
    switch (type) {
      case 'partner': return 'Хамтрагч';
      case 'client': return 'Үйлчлүүлэгч';
      case 'sponsor': return 'Ивээн тэтгэгч';
      default: return type || '-';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground flex items-center gap-3">
            <Building2 className="w-6 h-6" />
            Хамтрагчдын удирдлага
          </h1>
          <p className="text-muted-foreground">Хамтрагч болон үйлчлүүлэгчдийн мэдээллийг удирдах</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Хамтрагч нэмэх
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Ачааллаж байна...</div>
        ) : partners.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Хамтрагч бүртгээгүй байна
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Төрөл</TableHead>
                <TableHead>Вэбсайт</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Дараалал</TableHead>
                <TableHead className="text-right">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{getPartnerTypeLabel(partner.partner_type)}</TableCell>
                  <TableCell>
                    {partner.website_url ? (
                      <a 
                        href={partner.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {new URL(partner.website_url).hostname}
                      </a>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={partner.is_active ? 'default' : 'secondary'}>
                      {partner.is_active ? 'Идэвхтэй' : 'Идэвхгүй'}
                    </Badge>
                  </TableCell>
                  <TableCell>{partner.display_order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(partner)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(partner.id)}
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

      <PartnerForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editData={editData}
        onSuccess={loadPartners}
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

export default AdminPartnersPage;
