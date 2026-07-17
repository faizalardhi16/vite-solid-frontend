import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * TaskForm — SINGLE RESPONSIBILITY: render the task creation form.
 * Only form presentation + local input state. Submit delegated via props.
 */
export function TaskForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1 flex flex-col gap-1">
        <Input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex-[2] flex flex-col gap-1">
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading || !title.trim()}>
        {isLoading ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
}
