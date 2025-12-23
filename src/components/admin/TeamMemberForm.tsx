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
import { Loader2 } from 'lucide-react';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Нэр оруулна уу'),
  position: z.string().optional(),
  position_mn: z.string().optional(),
  bio: z.string().optional(),
  bio_mn: z.string().optional(),
  image_url: z.string().optional(),
  email: z.string().email('Зөв имэйл оруулна уу').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedin_url: z.string().optional(),
  is_active: z.boolean().default(true),
  display_order: z.number().default(0),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamMemberFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
  onSuccess: () => void;
}

export const TeamMemberForm = ({ open, onOpenChange, editData, onSuccess }: TeamMemberFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      is_active: true,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        position: editData.position || '',
        position_mn: editData.position_mn || '',
        bio: editData.bio || '',
        bio_mn: editData.bio_mn || '',
        image_url: editData.image_url || '',
        email: editData.email || '',
        phone: editData.phone || '',
        linkedin_url: editData.linkedin_url || '',
        is_active: editData.is_active ?? true,
        display_order: editData.display_order || 0,
      });
    } else {
      reset({
        name: '',
        position: '',
        position_mn: '',
        bio: '',
        bio_mn: '',
        image_url: '',
        email: '',
        phone: '',
        linkedin_url: '',
        is_active: true,
        display_order: 0,
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: TeamMemberFormData) => {
    setIsLoading(true);
    try {
      // Clean empty strings to null
      const payload = {
        ...data,
        email: data.email || null,
      };

      if (editData?.id) {
        const { error } = await supabase
          .from('team_members')
          .update(payload)
          .eq('id', editData.id);
        
        if (error) throw error;
        toast.success('Гишүүн амжилттай шинэчлэгдлээ');
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([{ ...payload, name: data.name }]);
        
        if (error) throw error;
        toast.success('Гишүүн амжилттай нэмэгдлээ');
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
          <DialogTitle>{editData ? 'Гишүүн засах' : 'Шинэ гишүүн нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Нэр *</Label>
            <Input id="name" {...register('name')} placeholder="Нэр" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Албан тушаал (EN)</Label>
              <Input id="position" {...register('position')} placeholder="Position" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position_mn">Албан тушаал (MN)</Label>
              <Input id="position_mn" {...register('position_mn')} placeholder="Албан тушаал" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Танилцуулга (EN)</Label>
              <Textarea id="bio" {...register('bio')} placeholder="Bio" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio_mn">Танилцуулга (MN)</Label>
              <Textarea id="bio_mn" {...register('bio_mn')} placeholder="Танилцуулга" rows={3} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Зургийн URL</Label>
            <Input id="image_url" {...register('image_url')} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Имэйл</Label>
              <Input id="email" type="email" {...register('email')} placeholder="email@example.com" />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Утас</Label>
              <Input id="phone" {...register('phone')} placeholder="+976..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input id="linkedin_url" {...register('linkedin_url')} placeholder="https://linkedin.com/in/..." />
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
