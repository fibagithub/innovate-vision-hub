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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Plus, X } from 'lucide-react';

const serviceSchema = z.object({
  name: z.string().min(1, 'Нэр оруулна уу'),
  name_mn: z.string().optional(),
  description: z.string().optional(),
  description_mn: z.string().optional(),
  icon: z.string().optional(),
  is_active: z.boolean().default(true),
  display_order: z.number().default(0),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
  onSuccess: () => void;
}

export const ServiceForm = ({ open, onOpenChange, editData, onSuccess }: ServiceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      is_active: true,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        name_mn: editData.name_mn || '',
        description: editData.description || '',
        description_mn: editData.description_mn || '',
        icon: editData.icon || '',
        is_active: editData.is_active ?? true,
        display_order: editData.display_order || 0,
      });
      setFeatures(editData.features || []);
    } else {
      reset({
        name: '',
        name_mn: '',
        description: '',
        description_mn: '',
        icon: 'Package',
        is_active: true,
        display_order: 0,
      });
      setFeatures([]);
    }
  }, [editData, reset]);

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        features,
      };

      if (editData?.id) {
        const { error } = await supabase
          .from('services')
          .update(payload)
          .eq('id', editData.id);
        
        if (error) throw error;
        toast.success('Үйлчилгээ амжилттай шинэчлэгдлээ');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{ ...payload, name: data.name }]);
        
        if (error) throw error;
        toast.success('Үйлчилгээ амжилттай нэмэгдлээ');
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
          <DialogTitle>{editData ? 'Үйлчилгээ засах' : 'Шинэ үйлчилгээ нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Нэр (EN)</Label>
              <Input id="name" {...register('name')} placeholder="Service name" />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_mn">Нэр (MN)</Label>
              <Input id="name_mn" {...register('name_mn')} placeholder="Үйлчилгээний нэр" />
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
              <Label htmlFor="icon">Icon нэр</Label>
              <Input id="icon" {...register('icon')} placeholder="Package" />
              <p className="text-xs text-muted-foreground">Lucide icon нэр (жнь: Package, Users, Globe)</p>
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

          <div className="space-y-2">
            <Label>Онцлогууд</Label>
            <div className="flex gap-2">
              <Input 
                value={newFeature} 
                onChange={(e) => setNewFeature(e.target.value)} 
                placeholder="Онцлог нэмэх"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feature, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
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
