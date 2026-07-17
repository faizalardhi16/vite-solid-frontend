import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_LABELS = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_VARIANTS = {
  todo: "outline",
  in_progress: "secondary",
  done: "default",
};

/**
 * TaskItem — SINGLE RESPONSIBILITY: render a single task row.
 * Only presentation. Actions received as props.
 *
 * @param {{ task: object, onDelete: (id: string) => void, onStatusChange: (id: string, status: string) => void }} props
 */
export function TaskItem({ task, onDelete, onStatusChange }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
      <div className="flex flex-col gap-1">
        <span className="font-medium">{task.title}</span>
        {task.description && (
          <span className="text-sm text-muted-foreground">{task.description}</span>
        )}
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={STATUS_VARIANTS[task.status]}>{STATUS_LABELS[task.status]}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {task.status !== "todo" && (
          <Button size="sm" variant="ghost" onClick={() => onStatusChange(task.id, "todo")}>
            ← To Do
          </Button>
        )}
        {task.status !== "in_progress" && (
          <Button size="sm" variant="ghost" onClick={() => onStatusChange(task.id, "in_progress")}>
            ▶ In Progress
          </Button>
        )}
        {task.status !== "done" && (
          <Button size="sm" variant="ghost" onClick={() => onStatusChange(task.id, "done")}>
            ✓ Done
          </Button>
        )}
        <Button size="sm" variant="destructive" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
