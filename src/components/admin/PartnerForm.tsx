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
import { Loader2, Upload, X } from 'lucide-react';

const REGIONS = [
  { value: 'ulaanbaatar', label: 'Улаанбаатар хот', label_en: 'Ulaanbaatar City' },
  { value: 'west', label: 'Баруун бүс', label_en: 'Western Region' },
  { value: 'north', label: 'Хойд бүс', label_en: 'Northern Region' },
  { value: 'khangai', label: 'Хангайн бүс', label_en: 'Khangai Region' },
  { value: 'central', label: 'Төвийн бүс', label_en: 'Central Region' },
  { value: 'gobi', label: 'Говийн бүс', label_en: 'Gobi Region' },
  { value: 'east', label: 'Зүүн бүс', label_en: 'Eastern Region' },
];

const partnerSchema = z.object({
  name: z.string().min(1, 'Нэр заавал оруулна'),
  partner_type: z.enum(['partner', 'client']),
  region: z.string().min(1, 'Бүс сонгоно уу'),
  count: z.number().min(0, 'Тоо 0-ээс их байх ёстой'),
  description: z.string().optional(),
  description_mn: z.string().optional(),
  logo_url: z.string().optional(),
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
  const [isUploading, setIsUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: '',
      partner_type: 'partner',
      region: '',
      count: 0,
      description: '',
      description_mn: '',
      logo_url: '',
      is_active: true,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        partner_type: (editData.partner_type as 'partner' | 'client') || 'partner',
        region: editData.region || '',
        count: editData.count || 0,
        description: editData.description || '',
        description_mn: editData.description_mn || '',
        logo_url: editData.logo_url || '',
        is_active: editData.is_active ?? true,
        display_order: editData.display_order || 0,
      });
      setLogoPreview(editData.logo_url || null);
    } else {
      reset({
        name: '',
        partner_type: 'partner',
        region: '',
        count: 0,
        description: '',
        description_mn: '',
        logo_url: '',
        is_active: true,
        display_order: 0,
      });
      setLogoPreview(null);
    }
  }, [editData, reset]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `partner-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setValue('logo_url', data.publicUrl);
      setLogoPreview(data.publicUrl);
      toast.success('Лого амжилттай оруулагдлаа');
    } catch (error: any) {
      toast.error(error.message || 'Лого оруулахад алдаа гарлаа');
    } finally {
      setIsUploading(false);
    }
  };

  const removeLogo = () => {
    setValue('logo_url', '');
    setLogoPreview(null);
  };

  const onSubmit = async (data: PartnerFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        partner_type: data.partner_type,
        region: data.region,
        count: data.count,
        description: data.description || null,
        description_mn: data.description_mn || null,
        logo_url: data.logo_url || null,
        is_active: data.is_active,
        display_order: data.display_order,
        country: 'mongolia',
      };

      if (editData?.id) {
        const { error } = await supabase
          .from('partners')
          .update(payload)
          .eq('id', editData.id);
        
        if (error) throw error;
        toast.success('Хамтрагч амжилттай шинэчлэгдлээ');
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([payload]);
        
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? 'Хамтрагч засах' : 'Шинэ хамтрагч нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Нэр *</Label>
            <Input id="name" {...register('name')} placeholder="Хамтрагчийн нэр" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          {/* Partner Type */}
          <div className="space-y-2">
            <Label>Төрөл *</Label>
            <Select value={watch('partner_type') || 'partner'} onValueChange={(value: 'partner' | 'client') => setValue('partner_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Төрөл сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partner">Хамтрагч</SelectItem>
                <SelectItem value="client">Харилцагч</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Лого</Label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative w-20 h-20 rounded-lg border border-border overflow-hidden bg-muted">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground mt-1">Оруулах</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Region Selection */}
          <div className="space-y-2">
            <Label>Бүс *</Label>
            <Select value={watch('region') || ''} onValueChange={(value) => setValue('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Бүс сонгох" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && <p className="text-sm text-destructive">{errors.region.message}</p>}
          </div>

          {/* Count */}
          <div className="space-y-2">
            <Label htmlFor="count">Тоо *</Label>
            <Input 
              id="count" 
              type="number" 
              {...register('count', { valueAsNumber: true })} 
              placeholder="0"
            />
            {errors.count && <p className="text-sm text-destructive">{errors.count.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description_mn">Тайлбар (MN)</Label>
            <Textarea id="description_mn" {...register('description_mn')} placeholder="Тайлбар" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Тайлбар (EN)</Label>
            <Textarea id="description" {...register('description')} placeholder="Description" rows={2} />
          </div>

          {/* Order & Active */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display_order">Эрэмбэ</Label>
              <Input 
                id="display_order" 
                type="number" 
                {...register('display_order', { valueAsNumber: true })} 
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                checked={watch('is_active')}
                onCheckedChange={(checked) => setValue('is_active', checked)}
              />
              <Label>Идэвхтэй</Label>
            </div>
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
