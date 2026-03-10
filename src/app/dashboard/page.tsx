"use client";

import { useState } from "react";
import { Flex, Heading, Text, VStack, Box } from "@chakra-ui/react";
import { TaskForm } from "@/components/dashboard/TaskForm";
import { TaskList } from "@/components/dashboard/TaskList";
import { Task } from "@/components/dashboard/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async (title: string, description: string) => {
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/prioritize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to prioritize task.");
      }

      const newTask: Task = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        description,
        score: data.score,
        justification: data.justification,
      };

      setTasks((prev) => [newTask, ...prev]);
      
      alert(`Task Analyzed!\nAI assigned a score of ${data.score}/10.`);
      
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" direction="column" align="center" py={12} px={4} bg="gray.100" _dark={{ bg: "gray.950" }}>
      <VStack spacing={8} w="full" maxW="3xl">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2}>
            AI Task Manager
          </Heading>
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
            Submit your tasks and let the LLM evaluate their urgency and impact.
          </Text>
        </Box>

        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
        
        <Box w="full" pt={6}>
          <Heading as="h2" size="lg" mb={6}>
            Prioritized Tasks
          </Heading>
          <TaskList tasks={tasks} />
        </Box>
      </VStack>
    </Flex>
  );
}
