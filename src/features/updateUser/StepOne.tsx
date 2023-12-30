import React, { useEffect, useRef } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Icon,
  Select,
  Box,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import { Controller } from 'react-hook-form';
import { ACCEPTED_IMAGE_TYPES, MB_BYTES } from '@/lib/helper';
import { stepOneValues } from './schema';
import { useUser } from '../user/useUser';

export default function StepOne({ form , 
  setIsValidFistStep
}: { form: any , 
  setIsValidFistStep : React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    formState: { errors },
    register,
    control,
  } = form;
  const [fileName, setFileName] = React.useState<string | undefined>('');
  const photoRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const userInfo = user ? user.user_metadata : {};
  const handleClick = () => {
    photoRef.current?.click();
  };
  useEffect(()=>{
    const isValidFistStepState = Object.keys(stepOneValues).every(
      (key) => form.getValues(key as keyof typeof stepOneValues) !== ''
      || form.getValues('avatar_url' ) !== undefined 
    );
  
   
    setIsValidFistStep(isValidFistStepState)
  } , [form.getValues()])


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
              defaultValue={userInfo?.full_name || ''}
              borderColor={errors['full_name'] ? 'red.500' : 'gray.300'}
              placeholder="Full Name"
              {...register('full_name', { required: true })}
            />
            {errors['full_name'] && (
              <Box color="red.500" as="span" fontSize="1.2rem">
                {errors['full_name'].message}
              </Box>
            )}
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
            <Box
              width="100%"
              __css={{
                input: {
                  width: '100%',
                  borderColor: errors.phone ? 'red.500' : 'gray.300',
                },
              }}
            >
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    id="phone"
                    defaultValue={userInfo?.phone || ''}

                    defaultCountry="eg"
                    {...register('phone', { required: true })}
                  />
                )}
              />
              {errors.phone && (
                <Box color="red.500" as="span" fontSize="1.2rem">
                  {errors.phone.message}
                </Box>
              )}
            </Box>
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
              height="3rem"
              name='gender'
              defaultValue={userInfo?.gender || ''}
              {...register('gender', { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer not to say</option>
            </Select>
            {errors.gender && (
              <Box as="span" color="red.500" fontSize="1.2rem">
                {errors.gender.message}
              </Box>
            )}
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize="1.4rem"
              mb="0.5rem"
              ml="0.2rem"
              htmlFor="avatar_url"
            >
              Profile Photo
            </FormLabel>
            <Box display="flex" alignItems="center">
              <Button onClick={handleClick} leftIcon={<Icon as={FiFile} />}>
                <span>Upload</span>
                <input
                  type="file"
                  hidden
                  name="avatar_url"
                  ref={photoRef}
                  required
                  onChange={(e) => {
                    if (!e.target.files) return;

                    if (e.target.files[0].size > MB_BYTES * 2) {
                      e.target.value = null || '';

                      return form.setError('avatar_url', {
                        message: 'Max image size is 2MB.',
                      });
                    }
                    if (
                      !ACCEPTED_IMAGE_TYPES.includes(e.target.files[0].type)
                    ) {
                      e.target.value = null || '';
                      return form.setError('avatar_url', {
                        message:
                          'Only .jpg, .jpeg, .png and .webp formats are supported.',
                      });
                    }

                    form.setValue('avatar_url', e.target.files[0]);
                    setFileName(e.target.files[0].name.split('.')[0]);
                    e.target.value = null || '';
                  }}
                />
              </Button>

              {errors.avatar_url && (
                <Box as="span" color="red.500" fontSize="1.2rem">
                  {errors.avatar_url.message}
                </Box>
              )}
              {fileName && (
                <Box as="span" ml="2" px="2" py="1" fontSize="1.2rem">
                  {fileName?.slice(0, 20)} ...
                </Box>
              )}
            </Box>
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
              name='date_of_birth'
              py="6"
              defaultValue={userInfo?.date_of_birth || ''}

              borderColor={errors.date_of_birth ? 'red.500' : 'gray.300'}
              onChange={(e) => {
                if(!e.target.value) {
                  return form.setError('date_of_birth', {
                    message: 'Please enter your birthday.',
                  });
                  
                }
                form.setValue('date_of_birth', e.target.value);
              }
              }
              {...register("date_of_birth", {require:true})}
             
            />
          </FormControl>
          {errors['date_of_birth'] && (
            <Box color="red.500" as="span" fontSize="1.2rem">
              {errors['date_of_birth'].message}
            </Box>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
