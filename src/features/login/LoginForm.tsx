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
  VStack,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from './useLogin';

const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required.' })
    .email({ message: 'Invalid email address. Please enter a valid email.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

type signInType = z.infer<typeof signInSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const goToForgetPassword = () => {
    navigate('/forget-password');
  };
  const { register, handleSubmit, formState } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const { isLoginLoading, userLogin } = useLogin();
  const onSubmit = (data: signInType) => userLogin(data);
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
              Log in to your account
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
                  htmlFor="email"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  py="6"
                  borderColor={formState.errors.email ? 'red.500' : 'gray.300'}
                  {...register('email', { required: true })}
                />
                {formState.errors.email && (
                  <Text
                    color="red.500"
                    fontSize="1.2rem"
                    mt="0.5rem"
                    ml="0.2rem"
                  >
                    {formState.errors.email.message}
                  </Text>
                )}
              </FormControl>
              <PasswordField
                formState={formState}
                register={register}
                isDisabled={isLoginLoading}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox
                sx={{
                  span: { fontSize: '1.2rem' },
                }}
              >
                Remember me
              </Checkbox>
              <Button
                textDecoration={'underline'}
                fontSize="1.2rem"
                variant="text"
                onClick={goToForgetPassword}
              >
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                py="6"
                size="lg"
                fontSize="lg"
                fontWeight="medium"
                colorScheme="blue"
                type="submit"
                isLoading={isLoginLoading}
                isDisabled={!formState.isValid || isLoginLoading}
              >
                Sign in
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
              </Container>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Stack mt="4" textAlign="center">
        <Text color="fg.muted">
          Don't have an account?{' '}
          <NavLink to="/register">
            <Text as="span" color="blue.500" textDecoration="underline" mx="2">
              Sign up
            </Text>
          </NavLink>
        </Text>
      </Stack>
    </Container>
  );
};
