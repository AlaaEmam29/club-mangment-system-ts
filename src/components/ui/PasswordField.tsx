import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  Text,
  useMergeRefs,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
type signIn = {
  email: string;
  password: string;
};
type signUp = {
  fullName: string;
  email: string;
  password: string;
};
type FormFields = signIn & signUp;

interface PasswordFieldProps extends InputProps {
  formState: FormState<FormFields>;
  register: UseFormRegister<FormFields>;
}
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };
    const { formState, register } = props || {};
    return (
      <FormControl>
        <FormLabel htmlFor="password" fontSize="1.4rem" mb="0.5rem" ml="0.2rem">
          Password
        </FormLabel>
        <InputGroup>
          <InputRightElement mr="0.5rem" height="100%">
            <IconButton
              variant="text"
              size="lg"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            py="6"
            type={isOpen ? 'text' : 'password'}
            ref={mergeRef}
            autoComplete="current-password"
            required
            borderColor={formState?.errors?.password ? 'red.500' : 'gray.300'}
            {...props}
            {...register('password', { required: true })}
            //
          />
        </InputGroup>
        {formState?.errors?.password && (
          <Text color="red.500" fontSize="1.2rem" mt="0.5rem">
            {formState?.errors?.password?.message}
          </Text>
        )}
      </FormControl>
    );
  }
);

PasswordField.displayName = 'PasswordField';
