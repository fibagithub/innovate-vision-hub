import { ReactNode } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { reorderItems } from '@/lib/reorder';

export function SortableContainer<T>({ items, getId, onChange, children, disabled = false }: {
  items: T[]; getId: (item: T, index: number) => string; onChange: (items: T[]) => void;
  children: ReactNode; disabled?: boolean;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const ids = items.map(getId);
  return <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
    if (disabled || !over || active.id === over.id) return;
    onChange(reorderItems(items, ids.indexOf(String(active.id)), ids.indexOf(String(over.id))));
  }}><SortableContext items={ids} strategy={verticalListSortingStrategy}>{children}</SortableContext></DndContext>;
}

function Handle({ sortable, label }: { sortable: ReturnType<typeof useSortable>; label: string }) {
  return <Button type="button" variant="ghost" size="icon" ref={sortable.setActivatorNodeRef}
    {...sortable.attributes} {...sortable.listeners} aria-label={label} title={label}
    className="shrink-0 touch-none cursor-grab active:cursor-grabbing text-muted-foreground"><GripVertical /></Button>;
}

export function SortableRow({ id, children, disabled = false }: { id: string; children: ReactNode; disabled?: boolean }) {
  const sortable = useSortable({ id, disabled });
  return <TableRow ref={sortable.setNodeRef} className={cn(sortable.isDragging && 'opacity-40', sortable.isOver && 'bg-accent/20')}>
    <TableCell className="w-14"><Handle sortable={sortable} label="Дараалал өөрчлөх" /></TableCell>{children}
  </TableRow>;
}

export function EditableSortableList<T>({ items, onChange, render, label }: {
  items: T[]; onChange: (items: T[]) => void;
  render: (item: T, index: number, update: (item: T) => void) => ReactNode; label: string;
}) {
  return <SortableContainer items={items} getId={(_, i) => String(i)} onChange={onChange}>
    <div className="space-y-2">{items.map((item, index) => <EditableItem key={index} id={String(index)} label={`${label} ${index + 1}`}>
      {render(item, index, value => onChange(items.map((current, i) => i === index ? value : current)))}
    </EditableItem>)}</div>
  </SortableContainer>;
}

function EditableItem({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const sortable = useSortable({ id });
  return <div ref={sortable.setNodeRef} className={cn('flex items-start gap-1 rounded-lg border border-border p-2 bg-background', sortable.isDragging && 'opacity-40', sortable.isOver && 'border-primary')}>
    <Handle sortable={sortable} label={`${label}: дараалал өөрчлөх`} />{children}
  </div>;
}