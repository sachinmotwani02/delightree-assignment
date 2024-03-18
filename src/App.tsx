import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Heading,
  Grid,
  GridItem,
  InputLeftAddon,
  Text,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import { Select, chakraComponents, OptionProps } from "chakra-react-select";
import { CheckIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { format, parse } from "date-fns";

type FormValues = {
  firstName: string;
  lastName: string;
  gender: { label: string; value: string } | null;
  dateOfBirth: string;
  techStack: string[];
  email: string;
  phoneNumber: string;
};

type CustomOptionProps<T> = OptionProps<T, boolean> & {
  isSelected?: boolean;
  position?: string;
};

const customComponents = {
  Option: <T extends {}>({ children, isSelected, ...props }: CustomOptionProps<T>) => (
    <chakraComponents.Option {...props} isSelected={isSelected}>
      {children}
      {isSelected && <CheckIcon w={4} h={4} color="green.300" ml="auto" />}
    </chakraComponents.Option>
  ),
};

const App: React.FC = () => {
  const {
    handleSubmit,
    register,
    trigger,
    getValues,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      // Set default form values
      firstName: "",
      lastName: "",
      gender: null,
      dateOfBirth: "",
      techStack: [],
      email: "",
      phoneNumber: "",
    },
  });

  const { isSubmitSuccessful, dirtyFields } = useFormState<FormValues>({ control });

  const toast = useToast();

  const [showFormData, setShowFormData] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowFormData(true);
      toast({
        title: "Form Submitted",
        description: "You have successfully filled your form.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }, 3000);
  };

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [newTechStack, setNewTechStack] = useState("");

  // useEffect(() => {
  //   console.log(techStacks);
  // }, [techStacks]);

  const handleAddTechStack = () => {
    if (newTechStack.trim()) {
      const updatedTechStacks = [...techStacks, newTechStack.trim()];
      setTechStacks(updatedTechStacks);
      setValue("techStack", updatedTechStacks);
      setNewTechStack("");
      trigger("techStack");
      techStackInputRef.current?.focus();
    }
  };

  const handleRemoveTechStack = (index: number) => {
    const updatedTechStacks = [...techStacks];
    updatedTechStacks.splice(index, 1);
    setTechStacks(updatedTechStacks);
    trigger("techStack");
    setValue("techStack", updatedTechStacks);
  };

  const techStackInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box w={{ lg: "70%", base: "90%" }} mx="auto" mt={8}>
      <Heading size="md" mb={6}>
        Basic Details
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <FormControl isInvalid={!!errors.firstName} mb={4}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                variant="filled"
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Name is incorrect",
                  },
                })}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.lastName} mb={4}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                variant="filled"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Name is incorrect",
                  },
                })}
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Heading size="md" mb={6} mt={6}>
          Other Details
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <FormControl isInvalid={!!errors.email} mb={4}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                variant="filled"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.phoneNumber} mb={4}>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon>+91</InputLeftAddon>
                <Input
                  id="phoneNumber"
                  type="tel"
                  variant="filled"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.gender} mb={4}>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                rules={{
                  required: "Please select a gender",
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    id="gender"
                    variant="filled"
                    options={options}
                    // closeMenuOnSelect={false}
                    className="chakra-react-select"
                    classNamePrefix="chakra-react-select"
                    placeholder="Select Gender"
                    components={customComponents}
                    selectedOptionColorScheme="blue"
                    chakraStyles={{
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        bg: "transparent",
                        px: 2,
                        cursor: "inherit",
                      }),
                      indicatorSeparator: (provided) => ({
                        ...provided,
                        display: "none",
                      }),
                    }}
                    onChange={(selectedOption) => onChange(selectedOption)}
                    value={value}
                  />
                )}
              />
              {errors.gender && <FormErrorMessage>{errors.gender.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.dateOfBirth}>
              <FormLabel htmlFor="dateOfBirth">Date of Birth:</FormLabel>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: "Date of Birth is required",
                  validate: (value) => {
                    const today = new Date();

                    if (new Date(value) > today) {
                      return "Invalid date";
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="date"
                    variant="filled"
                    id="dateOfBirth"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      const selectedDate = e.target.value;

                      onChange(selectedDate);
                    }}
                    value={value || ""}
                  />
                )}
              />
              <FormErrorMessage>{errors.dateOfBirth && errors.dateOfBirth.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.techStack}>
              <FormLabel htmlFor="techStack">Tech Stack</FormLabel>
              <InputGroup>
                <Input
                  id="techStack"
                  variant="filled"
                  placeholder="Enter a tech stack"
                  value={newTechStack}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTechStack();
                    }
                  }}
                  {...register("techStack", {
                    validate: (value = []) =>
                      value.length > 0 || techStacks.length > 0 || "At least one tech stack is required",
                    onChange: (e) => {
                      setNewTechStack(e.target.value);
                    },
                  })}
                  ref={techStackInputRef}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Add tech stack"
                    onClick={handleAddTechStack}
                    icon={<AddIcon w={3} h={3} />}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
              <Flex wrap="wrap" mt={2}>
                {techStacks.map((techStack, index) => (
                  <Flex
                    key={index}
                    alignItems="center"
                    justifyContent="space-between"
                    bg="gray.100"
                    borderRadius="md"
                    px={2}
                    py={1}
                    mr={2}
                    mb={2}
                  >
                    <Box>{techStack}</Box>
                    <IconButton
                      aria-label="Remove tech stack"
                      icon={<CloseIcon w={2} h={2} />}
                      size="sm"
                      variant="ghost"
                      ml={2}
                      onClick={() => handleRemoveTechStack(index)}
                    />
                  </Flex>
                ))}
              </Flex>
              <FormErrorMessage>{errors.techStack && errors.techStack.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2} alignSelf="center">
            <Button mt={4} colorScheme="blue" isLoading={isLoading} loadingText="Submitting" type="submit">
              Submit
            </Button>
          </GridItem>
        </Grid>
      </form>

      {isSubmitSuccessful && showFormData && (
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Form Data
          </Heading>
          <Flex direction="column" bg="gray.50" p={6} borderRadius="md" boxShadow="md">
            <FormDataDisplay formData={mergeFormData(getValues(), dirtyFields)} />
          </Flex>
        </Box>
      )}
    </Box>
  );
};
const mergeFormData = (initialValues: FormValues, dirtyFields: any): FormValues => {
  const mergedData: FormValues = {
    firstName: typeof dirtyFields.firstName === "boolean" ? initialValues.firstName : dirtyFields.firstName || "",
    lastName: typeof dirtyFields.lastName === "boolean" ? initialValues.lastName : dirtyFields.lastName || "",
    gender: typeof dirtyFields.gender === "boolean" ? initialValues.gender : dirtyFields.gender || "",
    dateOfBirth:
      typeof dirtyFields.dateOfBirth === "boolean" ? initialValues.dateOfBirth : dirtyFields.dateOfBirth || "",
    techStack: Array.isArray(dirtyFields.techStack)
      ? dirtyFields.techStack
      : Array.isArray(initialValues.techStack)
      ? initialValues.techStack
      : [],
    email: typeof dirtyFields.email === "boolean" ? initialValues.email : dirtyFields.email || "",
    phoneNumber:
      typeof dirtyFields.phoneNumber === "boolean" ? initialValues.phoneNumber : dirtyFields.phoneNumber || "",
  };

  return mergedData;
};
interface FormDataDisplayProps {
  formData: FormValues;
}

const FormDataDisplay: React.FC<FormDataDisplayProps> = ({ formData }) => {
  console.log(formData);
  const formatDate = (date: string) => {
    try {
      const parsedDate = parse(date, "yyyy-MM-dd", new Date());
      return format(parsedDate, "dd/MMM/yyyy");
    } catch (error) {
      console.error("Error parsing date:", error);
      return;
    }
  };
  return (
    <Flex direction="column">
      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">First Name</Text>
        <Text>{formData.firstName || "Not provided"}</Text>
      </Flex>

      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">Last Name</Text>
        <Text>{formData.lastName || "Not provided"}</Text>
      </Flex>

      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">Gender</Text>
        <Text>{formData.gender ? formData.gender.label : "Not provided"}</Text>
      </Flex>

      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">Date Of Birth</Text>
        <Text>{formatDate(formData.dateOfBirth) || "Not provided"}</Text>
      </Flex>

      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">Tech Stack</Text>
        <Text>{formData.techStack?.join(", ") || "Not provided"}</Text>
      </Flex>

      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">Phone Number</Text>
        <Text>{formData.phoneNumber || "Not provided"}</Text>
      </Flex>

      <Flex justify="space-between" mb={4} align="center">
        <Text fontWeight="semibold">Email</Text>
        <Text>{formData.email || "Not provided"}</Text>
      </Flex>
    </Flex>
  );
};

export default App;
