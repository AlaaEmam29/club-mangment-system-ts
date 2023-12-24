import { Logo } from '@/components/ui/Logo';
import { OAuthButtonGroup } from '@/components/ui/OAuthButtonGroup';
import { PasswordField } from '@/components/ui/PasswordField';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegister } from './useRegister';

const signUpSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: 'Name is required.' })
    .min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Invalid email address. Please enter a valid email.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});
type SignUpType = z.infer<typeof signUpSchema>;

export const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const { isRegisterLoading, registerUser } = useRegister();

  const onSubmit = (data: SignUpType) => registerUser(data);
  const onError = (errors: any) => console.log(errors);

  return (
    <Container
      maxW="2xl"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8" py="4">
        <Stack spacing="6">
          <Flex textAlign="center" justifyContent="center">
            <Logo h="16" color="blue.500" />
          </Flex>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading color="blue.500" size={{ base: 'lg' }}>
              Create your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack
            spacing="6"
            as="form"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Stack spacing="5">
              <FormControl>
                <FormLabel
                  fontSize="1.4rem"
                  mb="0.5rem"
                  ml="0.2rem"
                  htmlFor="name"
                >
                  Name
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  py="6"
                  {...register('fullName', { required: true })}
                  isDisabled={isRegisterLoading}
                />
                {formState.errors.fullName && (
                  <Text color="red.500">
                    {formState.errors.fullName.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize="1.4rem"
                  mb="0.5rem"
                  ml="0.2rem"
                  htmlFor="email"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  py="6"
                  {...register('email', { required: true })}
                  isDisabled={isRegisterLoading}
                />
                {formState.errors.email && (
                  <Text color="red.500">{formState.errors.email.message}</Text>
                )}
              </FormControl>
              <PasswordField
                formState={formState}
                register={register}
                isDisabled={isRegisterLoading}
              />
            </Stack>

            <Stack spacing="6" py="2">
              <Button
                py="6"
                size="lg"
                fontSize="lg"
                fontWeight="medium"
                colorScheme="blue"
                type="submit"
                isDisabled={!formState.isValid || isRegisterLoading}
                isLoading={isRegisterLoading}
              >
                Create account
              </Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <Container width="85%" mx="auto">
                <OAuthButtonGroup />
              </Container>{' '}
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Stack mt="4" textAlign="center">
        <Text color="fg.muted">
          Do you have an account?
          <NavLink to="/login">
            <Text as="span" mx="2" color="blue.500" textDecoration="underline">
              Sign In
            </Text>
          </NavLink>
        </Text>
      </Stack>
    </Container>
  );
};
