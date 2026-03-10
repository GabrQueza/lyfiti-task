"use client";

import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Flex minH="100vh" direction="column" align="center" justify="center" p={8}>
      <Flex direction="column" gap={8} align="center" textAlign="center">
        <Heading as="h1" fontSize={{ base: "5xl", sm: "7xl" }} fontWeight="extrabold" letterSpacing="tight">
          Lyfiti Task
        </Heading>
        <Text maxW="xl" fontSize="lg" mt={4}>
          Starting point for the Next.js application, fully migrated to Chakra UI v2.
        </Text>
        <Flex gap={4} mt={8}>
          <Button as={Link} href="/dashboard" colorScheme="blue" size="lg" borderRadius="full">
            Go to Dashboard
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
