import { test, expect } from 'bun:test';
import { reorderItems, orderedRecords } from './reorder';

test('dragging a service value preserves its text and moves it to the requested position', () => {
  const values = ['Metric one', 'Metric two', 'Metric three'];
  expect(reorderItems(values, 0, 2)).toEqual(['Metric two', 'Metric three', 'Metric one']);
  expect(values).toEqual(['Metric one', 'Metric two', 'Metric three']);
});
test('dragging records assigns concrete numeric order without removing records', () => {
  expect(orderedRecords(reorderItems([{ id: 'a', display_order: 9 }, { id: 'b', display_order: 10 }], 1, 0)))
    .toEqual([{ id: 'b', display_order: 0 }, { id: 'a', display_order: 1 }]);
});
test('invalid drop leaves values unchanged', () => {
  expect(reorderItems(['a', 'b'], 0, -1)).toEqual(['a', 'b']);
});