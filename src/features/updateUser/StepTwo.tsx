import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Grid,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function StepOne({ form }: { form: any }) {
  const {
    formState: { errors },
    register,
    control,
    setValue,
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
              Address
            </FormLabel>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Input
                id="street"
                type="text"
                py="6"
                borderColor={errors.street ? 'red.500' : 'gray.300'}
                {...register('street', { required: true })}
                placeholder="Street"
              />
              <Input
                id="city"
                type="text"
                py="6"
                placeholder="City"
                borderColor={errors.city ? 'red.500' : 'gray.300'}
                {...register('city', { required: true })}
              />
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize="1.4rem"
              mb="0.5rem"
              ml="0.2rem"
              htmlFor="phone"
            >
              Payment Information
            </FormLabel>
            <Input
              id="card_number"
              type="text"
              pattern="\d*"
              py="6"
              placeholder="Card Number"
              minLength="20"
              borderColor={errors.card_number ? 'red.500' : 'gray.300'}
              {...register('card_number', { required: true })}
            />
          </FormControl>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Input
              id="expiry_date"
              type="date"
              py="6"
              borderColor={errors.expiry_date ? 'red.500' : 'gray.300'}
              placeholder="Expiry Date"
              {...register('expiry_date', { required: true })}
            />

            <Input
              id="cvv"
              type="text"
              pattern="\d*"
              py="6"
              borderColor={errors.cvv ? 'red.500' : 'gray.300'}
              placeholder="CVV"
              {...register('cvv', { required: true })}
              maxLength="3"
            />
            <Input
              id="card_holder_name"
              type="text"
              py="6"
              placeholder="Card Holder Name"
              borderColor={errors.card_holder_name ? 'red.500' : 'gray.300'}
              {...register('card_holder_name', { required: true })}
            />
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
