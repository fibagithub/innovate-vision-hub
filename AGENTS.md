# Architecture rules
- Use shared dnd-kit sortable controls for admin lists and nested service values, with pointer, touch, and keyboard sensors, to keep ordering behavior consistent.
- Store content-list order in existing display_order fields and service-value order in existing serialized arrays; invalidate public query caches after saves so admin changes reach the website.