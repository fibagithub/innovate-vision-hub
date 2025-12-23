import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Edit, Trash2, Plus, Package, Users, Building2 } from 'lucide-react';
import { ServiceForm } from './ServiceForm';
import { TeamMemberForm } from './TeamMemberForm';
import { PartnerForm } from './PartnerForm';
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

interface ContentManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: string;
}

export const ContentManager = ({ open, onOpenChange, initialTab = 'services' }: ContentManagerProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  
  // Data states
  const [services, setServices] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  
  // Form states
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [teamFormOpen, setTeamFormOpen] = useState(false);
  const [partnerFormOpen, setPartnerFormOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string } | null>(null);

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      loadAllData();
    }
  }, [open, initialTab]);

  const loadAllData = async () => {
    setIsLoading(true);
    await Promise.all([loadServices(), loadTeamMembers(), loadPartners()]);
    setIsLoading(false);
  };

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error('Үйлчилгээ ачааллахад алдаа гарлаа');
    } else {
      setServices(data || []);
    }
  };

  const loadTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error('Багийн гишүүд ачааллахад алдаа гарлаа');
    } else {
      setTeamMembers(data || []);
    }
  };

  const loadPartners = async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error('Хамтрагчид ачааллахад алдаа гарлаа');
    } else {
      setPartners(data || []);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    const { type, id } = deleteConfirm;

    let error = null;
    
    if (type === 'service') {
      const result = await supabase.from('services').delete().eq('id', id);
      error = result.error;
    } else if (type === 'team') {
      const result = await supabase.from('team_members').delete().eq('id', id);
      error = result.error;
    } else if (type === 'partner') {
      const result = await supabase.from('partners').delete().eq('id', id);
      error = result.error;
    }

    if (error) {
      toast.error('Устгахад алдаа гарлаа');
    } else {
      toast.success('Амжилттай устгагдлаа');
      loadAllData();
    }
    
    setDeleteConfirm(null);
  };

  const openEditForm = (type: string, data: any) => {
    setEditData(data);
    switch (type) {
      case 'service': setServiceFormOpen(true); break;
      case 'team': setTeamFormOpen(true); break;
      case 'partner': setPartnerFormOpen(true); break;
    }
  };

  const openAddForm = (type: string) => {
    setEditData(null);
    switch (type) {
      case 'service': setServiceFormOpen(true); break;
      case 'team': setTeamFormOpen(true); break;
      case 'partner': setPartnerFormOpen(true); break;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Контент удирдлага</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Үйлчилгээ
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Баг
              </TabsTrigger>
              <TabsTrigger value="partners" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Хамтрагч
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <TabsContent value="services" className="mt-0">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Үйлчилгээнүүд ({services.length})</CardTitle>
                        <Button onClick={() => openAddForm('service')} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Нэмэх
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Нэр</TableHead>
                              <TableHead>Тайлбар</TableHead>
                              <TableHead>Төлөв</TableHead>
                              <TableHead className="text-right">Үйлдэл</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {services.map((service) => (
                              <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.name_mn || service.name}</TableCell>
                                <TableCell className="max-w-xs truncate">{service.description_mn || service.description}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {service.is_active ? 'Идэвхтэй' : 'Идэвхгүй'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => openEditForm('service', service)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm({ type: 'service', id: service.id })}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {services.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                  Үйлчилгээ байхгүй байна
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="team" className="mt-0">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Багийн гишүүд ({teamMembers.length})</CardTitle>
                        <Button onClick={() => openAddForm('team')} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Нэмэх
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Нэр</TableHead>
                              <TableHead>Албан тушаал</TableHead>
                              <TableHead>Имэйл</TableHead>
                              <TableHead>Төлөв</TableHead>
                              <TableHead className="text-right">Үйлдэл</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {teamMembers.map((member) => (
                              <TableRow key={member.id}>
                                <TableCell className="font-medium">{member.name}</TableCell>
                                <TableCell>{member.position_mn || member.position}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${member.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {member.is_active ? 'Идэвхтэй' : 'Идэвхгүй'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => openEditForm('team', member)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm({ type: 'team', id: member.id })}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {teamMembers.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                  Багийн гишүүн байхгүй байна
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="partners" className="mt-0">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Хамтрагчид ({partners.length})</CardTitle>
                        <Button onClick={() => openAddForm('partner')} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Нэмэх
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Нэр</TableHead>
                              <TableHead>Төрөл</TableHead>
                              <TableHead>Вэбсайт</TableHead>
                              <TableHead>Төлөв</TableHead>
                              <TableHead className="text-right">Үйлдэл</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {partners.map((partner) => (
                              <TableRow key={partner.id}>
                                <TableCell className="font-medium">{partner.name}</TableCell>
                                <TableCell>{partner.partner_type}</TableCell>
                                <TableCell className="max-w-xs truncate">{partner.website_url}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${partner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {partner.is_active ? 'Идэвхтэй' : 'Идэвхгүй'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => openEditForm('partner', partner)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm({ type: 'partner', id: partner.id })}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {partners.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                  Хамтрагч байхгүй байна
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Forms */}
      <ServiceForm
        open={serviceFormOpen}
        onOpenChange={setServiceFormOpen}
        editData={editData}
        onSuccess={loadServices}
      />
      <TeamMemberForm
        open={teamFormOpen}
        onOpenChange={setTeamFormOpen}
        editData={editData}
        onSuccess={loadTeamMembers}
      />
      <PartnerForm
        open={partnerFormOpen}
        onOpenChange={setPartnerFormOpen}
        editData={editData}
        onSuccess={loadPartners}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Устгахдаа итгэлтэй байна уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Энэ үйлдлийг буцаах боломжгүй. Мэдээлэл бүрмөсөн устгагдах болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
