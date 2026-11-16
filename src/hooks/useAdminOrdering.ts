import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { orderedRecords } from '@/lib/reorder';
import { toast } from 'sonner';

export function useAdminOrdering<T extends { id: string; display_order?: number | null }>(
  table: 'services' | 'partners' | 'team_members', setItems: (items: T[]) => void, reload: () => Promise<void>,
) {
  const [savingOrder, setSavingOrder] = useState(false);
  const queryClient = useQueryClient();
  const saveOrder = async (items: T[]) => {
    if (savingOrder) return;
    const ordered = orderedRecords(items);
    setSavingOrder(true);
    setItems(ordered);
    try {
      const results = await Promise.all(ordered.map(item => supabase.from(table).update({ display_order: item.display_order }).eq('id', item.id).select('id').single()));
      if (results.some(result => result.error)) throw new Error('Дараалал хадгалахад алдаа гарлаа');
      toast.success('Дараалал хадгалагдлаа');
    } catch {
      toast.error('Дараалал бүрэн хадгалагдсангүй. Дахин оролдоно уу.');
      await reload();
    } finally {
      await queryClient.invalidateQueries({ queryKey: [table] });
      if (table === 'partners') await queryClient.invalidateQueries({ queryKey: ['partner_stats'] });
      setSavingOrder(false);
    }
  };
  return { saveOrder, savingOrder };
}