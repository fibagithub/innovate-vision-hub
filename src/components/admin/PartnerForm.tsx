import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const partnerSchema = z.object({
  name: z.string().min(1, 'Нэр оруулна уу'),
  logo_url: z.string().optional(),
  website_url: z.string().optional(),
  description: z.string().optional(),
  description_mn: z.string().optional(),
  partner_type: z.string().default('partner'),
  is_active: z.boolean().default(true),
  display_order: z.number().default(0),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

interface PartnerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
  onSuccess: () => void;
}

export const PartnerForm = ({ open, onOpenChange, editData, onSuccess }: PartnerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      partner_type: 'partner',
      is_active: true,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        logo_url: editData.logo_url || '',
        website_url: editData.website_url || '',
        description: editData.description || '',
        description_mn: editData.description_mn || '',
        partner_type: editData.partner_type || 'partner',
        is_active: editData.is_active ?? true,
        display_order: editData.display_order || 0,
      });
    } else {
      reset({
        name: '',
        logo_url: '',
        website_url: '',
        description: '',
        description_mn: '',
        partner_type: 'partner',
        is_active: true,
        display_order: 0,
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: PartnerFormData) => {
    setIsLoading(true);
    try {
      if (editData?.id) {
        const { error } = await supabase
          .from('partners')
          .update(data)
          .eq('id', editData.id);
        
        if (error) throw error;
        toast.success('Хамтрагч амжилттай шинэчлэгдлээ');
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([{ ...data, name: data.name }]);
        
        if (error) throw error;
        toast.success('Хамтрагч амжилттай нэмэгдлээ');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? 'Хамтрагч засах' : 'Шинэ хамтрагч нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Нэр *</Label>
            <Input id="name" {...register('name')} placeholder="Хамтрагчийн нэр" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo_url">Лого URL</Label>
              <Input id="logo_url" {...register('logo_url')} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url">Вэбсайт URL</Label>
              <Input id="website_url" {...register('website_url')} placeholder="https://..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Тайлбар (EN)</Label>
              <Textarea id="description" {...register('description')} placeholder="Description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_mn">Тайлбар (MN)</Label>
              <Textarea id="description_mn" {...register('description_mn')} placeholder="Тайлбар" rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Төрөл</Label>
              <Select value={watch('partner_type')} onValueChange={(value) => setValue('partner_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner">Хамтрагч</SelectItem>
                  <SelectItem value="client">Үйлчлүүлэгч</SelectItem>
                  <SelectItem value="sponsor">Ивээн тэтгэгч</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_order">Эрэмбэ</Label>
              <Input 
                id="display_order" 
                type="number" 
                {...register('display_order', { valueAsNumber: true })} 
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={watch('is_active')}
              onCheckedChange={(checked) => setValue('is_active', checked)}
            />
            <Label>Идэвхтэй</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Цуцлах
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editData ? 'Хадгалах' : 'Нэмэх'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
