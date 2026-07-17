import { TaskItem } from "./TaskItem";
import { Spinner } from "@/components/ui/spinner";

/**
 * TaskList — SINGLE RESPONSIBILITY: render a list of tasks.
 * Only presentation. Receives data via props.
 */
export function TaskList({ tasks, isLoading, error, onDelete, onStatusChange }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return <p className="py-8 text-center text-destructive">{error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">No tasks yet. Create one above!</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
