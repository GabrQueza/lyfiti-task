"use client";

import { Box, Flex, Text, Heading, Badge } from "@chakra-ui/react";

export interface Task {
  id: string;
  title: string;
  description: string;
  score: number;
  justification: string;
}

export function TaskCard({ task }: { task: Task }) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "red";
    if (score >= 5) return "orange";
    return "green";
  };

  const scoreColor = getScoreColor(task.score);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      boxShadow="sm"
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Heading as="h3" size="md" maxW="80%">
          {task.title}
        </Heading>
        <Badge
          colorScheme={scoreColor}
          fontSize="1.2em"
          px={3}
          py={1}
          borderRadius="full"
        >
          {task.score}/10
        </Badge>
      </Flex>
      
      <Text color="gray.600" _dark={{ color: "gray.400" }} mb={4} noOfLines={3}>
        {task.description}
      </Text>

      <Box bg={`${scoreColor}.50`} _dark={{ bg: `${scoreColor}.900` }} p={3} borderRadius="md">
        <Text fontSize="sm" color={`${scoreColor}.800`} _dark={{ color: `${scoreColor}.200` }} fontWeight="medium">
          <strong>AI Reasoning:</strong> {task.justification}
        </Text>
      </Box>
    </Box>
  );
}
