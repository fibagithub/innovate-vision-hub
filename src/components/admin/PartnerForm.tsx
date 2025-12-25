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
  region: z.string().min(1, 'Бүс сонгоно уу'),
  count: z.number().min(0, 'Тоо 0-ээс их байх ёстой'),
  description: z.string().optional(),
  description_mn: z.string().optional(),
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
      region: '',
      count: 0,
      description: '',
      description_mn: '',
      is_active: true,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        region: editData.region || '',
        count: editData.count || 0,
        description: editData.description || '',
        description_mn: editData.description_mn || '',
        is_active: editData.is_active ?? true,
        display_order: editData.display_order || 0,
      });
    } else {
      reset({
        region: '',
        count: 0,
        description: '',
        description_mn: '',
        is_active: true,
        display_order: 0,
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: PartnerFormData) => {
    setIsLoading(true);
    try {
      const selectedRegion = REGIONS.find(r => r.value === data.region);
      const payload = {
        name: selectedRegion?.label || data.region,
        region: data.region,
        count: data.count,
        description: data.description || null,
        description_mn: data.description_mn || null,
        is_active: data.is_active,
        display_order: data.display_order,
        country: 'mongolia',
        partner_type: 'region',
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editData ? 'Хамтрагч засах' : 'Шинэ хамтрагч нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
