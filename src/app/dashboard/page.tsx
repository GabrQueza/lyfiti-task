"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Flex minH="100vh" direction="column" align="center" justify="center">
      <Heading as="h1" size="2xl">
        Dashboard
      </Heading>
      <Text mt={4} fontSize="lg">
        Welcome to the Dashboard
      </Text>
    </Flex>
  );
}
