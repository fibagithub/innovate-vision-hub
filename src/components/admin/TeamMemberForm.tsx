import { useState, useEffect, useRef } from 'react';
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
import { Loader2, Upload, X, User } from 'lucide-react';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Англи нэр оруулна уу'),
  name_mn: z.string().optional(),
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
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      is_active: true,
      display_order: 0,
    },
  });

  const imageUrl = watch('image_url');

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        name_mn: editData.name_mn || '',
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
      setPreviewUrl(editData.image_url || null);
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
      setPreviewUrl(null);
    }
  }, [editData, reset]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Зөвхөн зураг оруулах боломжтой');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Зургийн хэмжээ 5MB-ээс бага байх ёстой');
      return;
    }

    setIsUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `team-members/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      
      setValue('image_url', publicUrl);
      setPreviewUrl(publicUrl);
      toast.success('Зураг амжилттай оруулагдлаа');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Зураг оруулахад алдаа гарлаа');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setValue('image_url', '');
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    setIsLoading(true);
    try {
      // Clean empty strings to null
      const payload = {
        ...data,
        email: data.email || null,
        image_url: data.image_url || null,
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

          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label>Профайл зураг</Label>
            <div className="flex items-start gap-4">
              {/* Preview */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-dashed border-border">
                {previewUrl ? (
                  <>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <User className="w-10 h-10 text-muted-foreground" />
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Оруулж байна...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Зураг сонгох
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF (max 5MB)
                </p>
                
                {/* Manual URL input */}
                <Input 
                  {...register('image_url')} 
                  placeholder="Эсвэл URL оруулах..."
                  className="text-sm"
                  onChange={(e) => {
                    setValue('image_url', e.target.value);
                    setPreviewUrl(e.target.value || null);
                  }}
                />
              </div>
            </div>
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
