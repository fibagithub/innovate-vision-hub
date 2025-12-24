import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
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
import { ServiceForm } from '@/components/admin/ServiceForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  name_mn: string | null;
  description: string | null;
  category: string | null;
  icon: string | null;
  icon_url: string | null;
  usage_metric: string | null;
  features: string[] | null;
  is_active: boolean | null;
  display_order: number | null;
}

const AdminServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error('Үйлчилгээ ачаалахад алдаа гарлаа');
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', deleteId);
    
    if (error) {
      toast.error('Устгахад алдаа гарлаа');
    } else {
      toast.success('Амжилттай устгалаа');
      loadServices();
    }
    setDeleteId(null);
  };

  const openEdit = (service: Service) => {
    setEditData(service);
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
            <Package className="w-6 h-6" />
            Үйлчилгээний удирдлага
          </h1>
          <p className="text-muted-foreground">Үйлчилгээний мэдээллийг удирдах</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Үйлчилгээ нэмэх
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Ачааллаж байна...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Үйлчилгээ бүртгээгүй байна
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Usage Metric</TableHead>
                <TableHead>Онцлогууд</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead className="text-right">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {service.icon_url ? (
                      <img src={service.icon_url} alt={service.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {service.category || '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {service.usage_metric || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {service.features?.slice(0, 2).map((f, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{f}</Badge>
                      ))}
                      {(service.features?.length || 0) > 2 && (
                        <Badge variant="outline" className="text-xs">+{(service.features?.length || 0) - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.is_active ? 'default' : 'secondary'}>
                      {service.is_active ? 'Идэвхтэй' : 'Идэвхгүй'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(service.id)}
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

      <ServiceForm
        open={formOpen}
        onOpenChange={setFormOpen}
        editData={editData}
        onSuccess={loadServices}
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

export default AdminServicesPage;
