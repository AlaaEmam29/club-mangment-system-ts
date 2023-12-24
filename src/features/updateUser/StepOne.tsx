import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Icon,
  Select,
} from '@chakra-ui/react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { FiFile } from 'react-icons/fi';

import { useForm, Controller } from 'react-hook-form';

import 'react-phone-number-input/style.css';
import FileUpload from '@/components/ui/FileUpload';
const stylePhoneInput = {
  width: '100%',
  height: '3rem',
  padding: '0.5rem',
  fontSize: '1.4rem',
  borderRadius: '0.5rem',
  border: '1px solid #E2E8F0',
  outline: 'none',
  transition: 'all 0.2s',
  _focus: {
    border: '1px solid #63B3ED',
    backgroundColor: '#F7FAFF',
  },
  _placeholder: {
    color: '#A0AEC0',
  },
};
export default function StepOne({ form }: { form: any }) {
  const validateFiles = (file: File) => {
    if (file.length < 1) {
      return 'Files is required';
    }
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 2;
    if (fsMb > MAX_FILE_SIZE) {
      return 'Max file size 2mb';
    }

    return true;
  };

  const {
    formState: { errors },
    register,
    control,
  } = form;
  return (
    <Container
      boxShadow="md"
      py={{ base: '6', sm: '10' }}
      px={{ base: '4', sm: '10' }}
      borderRadius="xl"
      maxW="2xl"
      my={{ base: '12', md: '24' }}
    >
      <Stack spacing="6" as="form">
        <Stack spacing="5">
          <FormControl>
            <FormLabel fontSize="1.4rem" mb="0.5rem" ml="0.2rem" htmlFor="name">
              Full Name
            </FormLabel>
            <Input
              id="name"
              type="text"
              py="6"
              borderColor={errors.name ? 'red.500' : 'gray.300'}
              placeholder="Full Name"
              {...register('full_name', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize="1.4rem"
              mb="0.5rem"
              ml="0.2rem"
              htmlFor="phone"
            >
              Phone Number
            </FormLabel>
            <Controller
              name="phone"
              control={control}
              rules={{
                validate: (value) => isValidPhoneNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  id="phone"
                  style={stylePhoneInput}
                  {...register('phone', { required: true })}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize="1.4rem"
              mb="0.5rem"
              ml="0.2rem"
              htmlFor="gender "
            >
              Gender
            </FormLabel>
            <Select
              placeholder="Select your gender"
              py="6"
              {...register('gender', { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer not to say</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize="1.4rem"
              mb="0.5rem"
              ml="0.2rem"
              htmlFor="profilePhoto"
            >
              Profile Photo
            </FormLabel>
            <FileUpload
              accept={'image/*'}
              multiple={false}
              register={register('profilePhoto', { validate: validateFiles })}
            >
              <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
            </FileUpload>
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize="1.4rem"
              mb="0.5rem"
              ml="0.2rem"
              htmlFor="date_of_birth"
            >
              Birthday
            </FormLabel>
            <Input
              id="date_of_birth"
              type="date"
              py="6"
              borderColor={errors.date_of_birth ? 'red.500' : 'gray.300'}
              {...register('date_of_birth', { required: true })}
            />
          </FormControl>
        </Stack>
      </Stack>
    </Container>
  );
}
