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
import { Loader2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';

const serviceSchema = z.object({
  name: z.string().min(1, 'Нэр оруулна уу'),
  name_mn: z.string().optional(),
  description: z.string().optional(),
  description_mn: z.string().optional(),
  category: z.string().optional(),
  category_mn: z.string().optional(),
  icon: z.string().optional(),
  icon_url: z.string().optional(),
  usage_metric: z.string().optional(),
  usage_metric_mn: z.string().optional(),
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

interface Benefit {
  title: string;
  description: string;
}

export const ServiceForm = ({ open, onOpenChange, editData, onSuccess }: ServiceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [usageMetrics, setUsageMetrics] = useState<string[]>([]);
  const [newUsageMetric, setNewUsageMetric] = useState('');
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [newBenefitTitle, setNewBenefitTitle] = useState('');
  const [newBenefitDesc, setNewBenefitDesc] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      is_active: true,
      display_order: 0,
    },
  });

  const iconUrl = watch('icon_url');

  // Parse usage_metric string to array (format: "value1|value2|value3")
  const parseUsageMetrics = (value: string | null | undefined): string[] => {
    if (!value) return [];
    return value.split('|').map(v => v.trim()).filter(v => v);
  };

  // Join usage metrics array to string
  const joinUsageMetrics = (metrics: string[]): string => {
    return metrics.join('|');
  };

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || '',
        name_mn: editData.name_mn || '',
        description: editData.description || '',
        description_mn: editData.description_mn || '',
        category: editData.category || '',
        category_mn: editData.category_mn || '',
        icon: editData.icon || '',
        icon_url: editData.icon_url || '',
        usage_metric: editData.usage_metric || '',
        usage_metric_mn: editData.usage_metric_mn || '',
        is_active: editData.is_active ?? true,
        display_order: editData.display_order || 0,
      });
      setFeatures(editData.features || []);
      setUsageMetrics(parseUsageMetrics(editData.usage_metric));
      setBenefits(editData.benefits || []);
      setIconPreview(editData.icon_url || null);
    } else {
      reset({
        name: '',
        name_mn: '',
        description: '',
        description_mn: '',
        category: '',
        category_mn: '',
        icon: 'Package',
        icon_url: '',
        usage_metric: '',
        usage_metric_mn: '',
        is_active: true,
        display_order: 0,
      });
      setFeatures([]);
      setUsageMetrics([]);
      setBenefits([]);
      setIconPreview(null);
    }
  }, [editData, reset]);

  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Зөвхөн зураг оруулах боломжтой');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Зургийн хэмжээ 2MB-аас бага байх ёстой');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `service-icon-${Date.now()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setValue('icon_url', publicUrl);
      setIconPreview(publicUrl);
      toast.success('Icon амжилттай оруулагдлаа');
    } catch (error: any) {
      toast.error(error.message || 'Icon оруулахад алдаа гарлаа');
    } finally {
      setIsUploading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addUsageMetric = () => {
    if (newUsageMetric.trim()) {
      const updated = [...usageMetrics, newUsageMetric.trim()];
      setUsageMetrics(updated);
      setValue('usage_metric', joinUsageMetrics(updated));
      setNewUsageMetric('');
    }
  };

  const removeUsageMetric = (index: number) => {
    const updated = usageMetrics.filter((_, i) => i !== index);
    setUsageMetrics(updated);
    setValue('usage_metric', joinUsageMetrics(updated));
  };

  const addBenefit = () => {
    if (newBenefitTitle.trim()) {
      setBenefits([...benefits, { title: newBenefitTitle.trim(), description: newBenefitDesc.trim() }]);
      setNewBenefitTitle('');
      setNewBenefitDesc('');
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        features,
        benefits: JSON.parse(JSON.stringify(benefits)),
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? 'Үйлчилгээ засах' : 'Шинэ үйлчилгээ нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Icon Upload Section */}
          <div className="space-y-3">
            <Label>Бүтээгдэхүүний Icon</Label>
            <div className="flex items-start gap-4">
              <div 
                className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted/50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                ) : iconPreview ? (
                  <img src={iconPreview} alt="Icon" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleIconUpload}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Icon оруулах
                </Button>
                <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max 2MB)</p>
                <Input 
                  {...register('icon_url')} 
                  placeholder="эсвэл URL оруулах" 
                  className="text-sm"
                  onChange={(e) => {
                    setValue('icon_url', e.target.value);
                    setIconPreview(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Label (EN)</Label>
              <Input id="category" {...register('category')} placeholder="Core Banking System" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category_mn">Category Label (MN)</Label>
              <Input id="category_mn" {...register('category_mn')} placeholder="Суурь банкны систем" />
            </div>
          </div>

          {/* Product Title Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Title (EN) *</Label>
              <Input id="name" {...register('name')} placeholder="MeCore" />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_mn">Product Title (MN)</Label>
              <Input id="name_mn" {...register('name_mn')} placeholder="МиКор" />
            </div>
          </div>

          {/* Description Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (EN)</Label>
              <Textarea id="description" {...register('description')} placeholder="Product description..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_mn">Description (MN)</Label>
              <Textarea id="description_mn" {...register('description_mn')} placeholder="Бүтээгдэхүүний тайлбар..." rows={3} />
            </div>
          </div>

          {/* Usage Metrics Section - Multiple Values */}
          <div className="space-y-2">
            <Label>Usage Metrics (Хэрэглээний үзүүлэлтүүд)</Label>
            <div className="flex gap-2">
              <Input 
                value={newUsageMetric} 
                onChange={(e) => setNewUsageMetric(e.target.value)} 
                placeholder="Үзүүлэлт нэмэх (жнь: 50+ байгууллага, 1000+ хэрэглэгч)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUsageMetric())}
              />
              <Button type="button" variant="outline" onClick={addUsageMetric}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {usageMetrics.map((metric, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/20 text-sm font-medium border border-accent/30">
                  {metric}
                  <button type="button" onClick={() => removeUsageMetric(index)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Олон үзүүлэлт нэмэх боломжтой. Дэлгэрэнгүй хуудас дээр тус тусдаа харуулна.</p>
            <input type="hidden" {...register('usage_metric')} />
          </div>

          {/* Feature Badges Section */}
          <div className="space-y-2">
            <Label>Feature Badges</Label>
            <div className="flex gap-2">
              <Input 
                value={newFeature} 
                onChange={(e) => setNewFeature(e.target.value)} 
                placeholder="Онцлог нэмэх (жнь: Санхүүгийн бүртгэл)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feature, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Benefits/Advantages Section */}
          <div className="space-y-3">
            <Label>Давуу талууд (Benefits)</Label>
            <p className="text-xs text-muted-foreground">Дэлгэрэнгүй хуудасны "Яагаад..." хэсэгт харуулагдана</p>
            <div className="space-y-2">
              <Input 
                value={newBenefitTitle} 
                onChange={(e) => setNewBenefitTitle(e.target.value)} 
                placeholder="Давуу талын нэр (жнь: Хурдан хандалт)"
              />
              <Input 
                value={newBenefitDesc} 
                onChange={(e) => setNewBenefitDesc(e.target.value)} 
                placeholder="Тайлбар (заавал биш)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
              />
              <Button type="button" variant="outline" onClick={addBenefit} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Давуу тал нэмэх
              </Button>
            </div>
            <div className="space-y-2 mt-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{benefit.title}</p>
                    {benefit.description && <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>}
                  </div>
                  <button type="button" onClick={() => removeBenefit(index)} className="text-muted-foreground hover:text-destructive">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Display Order and Icon Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon нэр (Lucide)</Label>
              <Input id="icon" {...register('icon')} placeholder="Package" />
              <p className="text-xs text-muted-foreground">Lucide icon нэр (жнь: Package, Database, Globe)</p>
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

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              checked={watch('is_active')}
              onCheckedChange={(checked) => setValue('is_active', checked)}
            />
            <Label>Идэвхтэй</Label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
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
