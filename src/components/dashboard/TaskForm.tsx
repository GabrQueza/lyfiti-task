"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskForm({ onSubmit, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    await onSubmit(title.trim(), description.trim());
    
    // Reset form upon success
    setTitle("");
    setDescription("");
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      w="full"
      p={6}
      borderWidth="1px"
      borderRadius="xl"
      bg="gray.50"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Task Title</FormLabel>
          <Input
            placeholder="e.g. Fix login API bug"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            bg="white"
            _dark={{ bg: "gray.800" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Detailed explanation of the task context..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            bg="white"
            _dark={{ bg: "gray.800" }}
          />
        </FormControl>

        {error && (
          <Text color="red.500" fontSize="sm" fontWeight="medium">
            {error}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={isLoading}
          loadingText="Analyzing with AI..."
          w="full"
          mt={2}
        >
          Evaluate & Create Task
        </Button>
      </VStack>
    </Box>
  );
}
