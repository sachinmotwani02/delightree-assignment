import React from "react";
import { Box, Flex, Heading, Text, Icon } from "@chakra-ui/react";
import { format, parse } from "date-fns";

type FormDataProps = {
  formData: Record<string, any>;
};

const FormDataDisplay: React.FC<FormDataProps> = ({ formData }) => {
  const { firstName, lastName, gender, dateOfBirth, techStack, email, phoneNumber } = formData;

  const formatDate = (date: string) => {
    try {
      const parsedDate = parse(date, "yyyy-MM-dd", new Date());
      return format(parsedDate, "dd/MMM/yyyy");
    } catch (error) {
      console.error("Error parsing date:", error);
      return;
    }
  };
  const formattedDate = formatDate(dateOfBirth);
  return (
    <Box mt={10}>
      <Heading size="md" mb={4}>
        Form Data
      </Heading>

      <Flex direction="column" bg="gray.50" p={6} borderRadius="md" boxShadow="md">
        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">First Name</Text>
          <Text>{firstName}</Text>
        </Flex>

        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">Last Name</Text>
          <Text>{lastName}</Text>
        </Flex>

        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">Gender</Text>
          <Text>{gender.label}</Text>
        </Flex>

        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">Date Of Birth</Text>
          <Text>{formattedDate}</Text>
        </Flex>

        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">Tech Stack</Text>
          <Text>{techStack.join(", ")}</Text>
        </Flex>

        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">Phone Number</Text>
          <Text>{phoneNumber}</Text>
        </Flex>

        <Flex justify="space-between" mb={4} align="center">
          <Text fontWeight="semibold">Email</Text>
          <Text>{email}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FormDataDisplay;
