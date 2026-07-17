import { Select } from "@/components/ui/select";

/**
 * FilterBar — SINGLE RESPONSIBILITY: render task status filter.
 * Only presentation. Filter value + onChange via props.
 */
export function FilterBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Filter:</span>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-36"
      >
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </Select>
    </div>
  );
}
