"use client";

import { Stack, Text } from "@chakra-ui/react";
import { TaskCard, Task } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Text color="gray.500" fontStyle="italic" textAlign="center" py={10}>
        No tasks yet. Create one to see the AI evaluation!
      </Text>
    );
  }

  // Sort tasks by highest priority first
  const sortedTasks = [...tasks].sort((a, b) => b.score - a.score);

  return (
    <Stack spacing={4} w="full">
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  );
}
