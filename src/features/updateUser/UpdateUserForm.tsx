import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateUserFormValues,
  stepOneValues,
  stepTwoValues,
  updateUserSchema,
} from './schema';
import useUpdateUser from './useUpdateUser';
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
const renderSteps = ({
  step , form  , isUpdateUserLoading , setIsValidSecondStep , setIsValidFistStep
} :{
  step : string , form : any , isUpdateUserLoading : boolean,
  setIsValidSecondStep: React.Dispatch<React.SetStateAction<boolean>>,
  setIsValidFistStep: React.Dispatch<React.SetStateAction<boolean>>}) => {
  switch (step) {
    case 'Step 1':
      return <StepOne form={form}
      setIsValidFistStep={setIsValidFistStep}
      />;
    case 'Step 2':
      return (
        <StepTwo 
        setIsValidSecondStep={setIsValidSecondStep}
        form={form} isLoadingOrDisabled={isUpdateUserLoading} />
      );

    default:
      return <StepOne form={form} 
      setIsValidFistStep={setIsValidFistStep}
      />;
  }
};
function UpdateUserForm() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [isValidFistStep , setIsValidFistStep] = useState<boolean>(false)
  const [isValidSecondStep , setIsValidSecondStep] = useState<boolean>(false)
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      ...stepOneValues,
      ...stepTwoValues,
    },
    mode: 'onBlur',
  });

  const { updateUser, isUpdateUserLoading } = useUpdateUser();

  const onSubmit = async () => {
    const data = form.getValues();
    try {
      const result = await updateUser(data);
      console.log(result);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  const step = steps[activeStep].title

  return (
    <Flex
      width="90%"
      mx="auto"
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
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {renderSteps({step, form , isUpdateUserLoading , setIsValidSecondStep , setIsValidFistStep})}
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
          isDisabled={activeStep === 0 || isUpdateUserLoading}
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
            isLoading={isUpdateUserLoading}
            isDisabled={
              activeStep !== steps.length - 1 ||
              !isValidSecondStep ||
              isUpdateUserLoading
            }
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
