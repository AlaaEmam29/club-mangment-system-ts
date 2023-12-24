import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Container,
  Stepper,
  useSteps,
  Box,
  Flex,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { zodResolver } from '@hookform/resolvers/zod';
import validator from 'validator';
import * as z from 'zod';

import { useForm } from 'react-hook-form';
const stepOnValues = {
  full_name: '',
  phone: '',
  date_of_birth: '',
  gender: '',
};
const stepTwoValues = {
  street: '',
  city: '',
  card_number: '',
  expiry_date: '',
  cvv: '',
  card_holder_name: '',
};

const updateUserSchema = z.object({
  full_name: z
    .string()
    .nonempty({ message: 'Full name is required.' })
    .min(2, { message: 'Full name must be at least 2 characters long.' }),
  phone: z
    .string()
    .nonempty({ message: 'Phone number is required.' })
    .refine(validator.isMobilePhone),
  date_of_birth: z.string().nonempty({ message: 'Date of birth is required.' }),

  gender: z.string().nonempty({ message: 'Gender is required.' }),
  street: z.string().nonempty({ message: 'Street is required.' }),
  city: z.string().nonempty({ message: 'City is required.' }),
  card_number: z
    .string()
    .min(1, { message: 'Card number is required.' })
    .min(20, { message: 'Card number must be at least 20 characters long.' }),
  expiry_date: z.string().nonempty({ message: 'Expiry date is required.' }),
  cvv: z
    .string()
    .nonempty({ message: 'CVV is required.' })
    .min(3, { message: 'CVV must be at least 3 characters long.' })
    .max(3, { message: 'CVV can be at most 3 characters long.' }),
  card_holder_name: z
    .string()
    .min(1, { message: 'Card holder name is required.' }),
});
type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
const steps = [
  {
    title: 'Step 1',
    description: 'Update User Information',
  },
  {
    title: 'Step 2',
    description: 'Update Address and Payment Information',
  },
];
function UpdateUserForm() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      ...stepOnValues,
      ...stepTwoValues,
    },
    mode: 'onBlur',
  });
  const isValidFistStep = Object.keys(stepOnValues).every(
    (key) => form.getValues(key as keyof typeof stepOnValues) !== ''
  );
  const isValidSecondStep = Object.keys(stepTwoValues).every(
    (key) => form.getValues(key as keyof typeof stepOnValues) !== ''
  );

  const renderSteps = (step: string) => {
    switch (step) {
      case 'Step 1':
        return <StepOne form={form} />;
      case 'Step 2':
        return <StepTwo form={form} />;
      default:
        return <StepOne form={form} />;
    }
  };
  const onSubmit = () => {
    const data = form.getValues();
    console.log(data);
  };
  console.log(form.formState.errors, 'form.formState.errors');
  return (
    <Flex
      width="90%"
      mx="auto"
      height="100vh"
      // justify='center'
      align="center"
      flexDirection="column"
      as="main"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stepper index={activeStep} width="100%" size={{ base: 'sm', md: 'lg' }}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator
              width={{ base: '2rem', md: '4rem' }}
              height={{ base: '2rem', md: '4rem' }}
            >
              <StepStatus
                complete={<StepIcon />}
                incomplete={
                  <StepNumber fontSize={{ base: '1.2rem', md: '1.8rem' }} />
                }
                active={
                  <StepNumber fontSize={{ base: '1.2rem', md: '1.8rem' }} />
                }
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {renderSteps(steps[activeStep].title)}
      <ButtonGroup mt="2rem">
        <Button
          colorScheme="blue"
          py="6"
          px="8"
          fontSize={{ base: '1.2rem', md: '1.4rem' }}
          onClick={() => {
            if (activeStep > 0) {
              setActiveStep(activeStep - 1);
            }
          }}
          isDisabled={activeStep === 0}
        >
          Previous
        </Button>

        {activeStep == steps.length - 1 ? (
          <Button
            py="6"
            px="8"
            fontSize={{ base: '1.2rem', md: '1.4rem' }}
            colorScheme="blue"
            onClick={onSubmit}
            isDisabled={activeStep !== steps.length - 1 || !isValidSecondStep}
          >
            Finish
          </Button>
        ) : (
          <Button
            py="6"
            px="8"
            fontSize={{ base: '1.2rem', md: '1.4rem' }}
            colorScheme="blue"
            onClick={() => {
              if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
              }
            }}
            isDisabled={activeStep === steps.length - 1 || !isValidFistStep}
          >
            Next
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
}

export default UpdateUserForm;
