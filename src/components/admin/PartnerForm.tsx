import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { Loader2, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const REGIONS = [
  { value: 'ulaanbaatar', label: 'Улаанбаатар хот' },
  { value: 'west', label: 'Баруун бүс' },
  { value: 'north', label: 'Хойд бүс' },
  { value: 'khangai', label: 'Хангайн бүс' },
  { value: 'central', label: 'Төвийн бүс' },
  { value: 'gobi', label: 'Говийн бүс' },
  { value: 'east', label: 'Зүүн бүс' },
];

const PARTNER_TYPES = [
  { value: 'bbsb', label: 'ББСБ' },
  { value: 'hzh', label: 'ХЗХ' },
  { value: 'bank', label: 'Банк' },
  { value: 'insurance', label: 'Даатгал' },
  { value: 'fintech', label: 'Финтек' },
  { value: 'other', label: 'Бусад' },
];

const partnerSchema = z.object({
  name: z.string().min(1, 'Нэр оруулна уу'),
  logo_url: z.string().optional(),
  website_url: z.string().optional(),
  description: z.string().optional(),
  description_mn: z.string().optional(),
  partner_type: z.string().default('bbsb'),
  country: z.string().default('mongolia'),
  region: z.string().optional(),
  partnership_date: z.date().optional().nullable(),
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
      partner_type: 'bbsb',
      country: 'mongolia',
      is_active: true,
      display_order: 0,
    },
  });

  const selectedCountry = watch('country');
  const selectedDate = watch('partnership_date');

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        logo_url: editData.logo_url || '',
        website_url: editData.website_url || '',
        description: editData.description || '',
        description_mn: editData.description_mn || '',
        partner_type: editData.partner_type || 'bbsb',
        country: editData.country || 'mongolia',
        region: editData.region || '',
        partnership_date: editData.partnership_date ? new Date(editData.partnership_date) : null,
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
        partner_type: 'bbsb',
        country: 'mongolia',
        region: '',
        partnership_date: null,
        is_active: true,
        display_order: 0,
      });
    }
  }, [editData, reset]);

  // Reset region when country changes to non-Mongolia
  useEffect(() => {
    if (selectedCountry !== 'mongolia') {
      setValue('region', '');
    }
  }, [selectedCountry, setValue]);

  const onSubmit = async (data: PartnerFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        logo_url: data.logo_url || null,
        website_url: data.website_url || null,
        description: data.description || null,
        description_mn: data.description_mn || null,
        partner_type: data.partner_type,
        country: data.country,
        region: data.country === 'mongolia' ? (data.region || null) : null,
        partnership_date: data.partnership_date ? format(data.partnership_date, 'yyyy-MM-dd') : null,
        is_active: data.is_active,
        display_order: data.display_order,
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

          {/* Partner Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Төрөл</Label>
              <Select value={watch('partner_type')} onValueChange={(value) => setValue('partner_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Төрөл сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {PARTNER_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Partnership Date */}
            <div className="space-y-2">
              <Label>Хамтрагч болсон огноо</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Огноо сонгох"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={(date) => setValue('partnership_date', date || null)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Country & Region */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Улс</Label>
              <Select value={watch('country')} onValueChange={(value) => setValue('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Улс сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mongolia">Монгол улс</SelectItem>
                  <SelectItem value="other">Бусад улс</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCountry === 'mongolia' && (
              <div className="space-y-2">
                <Label>Бүс</Label>
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
              </div>
            )}
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
