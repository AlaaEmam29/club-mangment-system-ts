import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useUser } from '../user/useUser';
import { stepTwoValues } from './schema';


export default function StepTwo({
  form,
  isLoadingOrDisabled,
  setIsValidSecondStep,
}: {
  form: any;
  isLoadingOrDisabled: boolean;
  setIsValidSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    formState: { errors },
    register,
  } = form;
  const { user } = useUser();
  const userInfo = user ? user.user_metadata : {};

  useEffect(()=>{
    const isValidSecondStepState = Object.keys(stepTwoValues).every(
      (key) => form.getValues(key as keyof typeof stepTwoValues) !== ''
    );
    console.log(form.getValues() , "isValidSecondStepState")
    setIsValidSecondStep(isValidSecondStepState)
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
              Address
            </FormLabel>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Input
                id="street"
                type="text"
                defaultValue={userInfo?.street || ''}

                py="6"
                name='street'
                borderColor={errors.street ? 'red.500' : 'gray.300'}
                {...register('street', { required: true })}
                placeholder="Street"
                isDisabled={isLoadingOrDisabled}
              />

              <Input
                            defaultValue={userInfo?.city || ''}

                id="city"
                type="text"
                py="6"
                placeholder="City"
                name='city'
                borderColor={errors.city ? 'red.500' : 'gray.300'}
                {...register('city', { required: true })}
                isDisabled={isLoadingOrDisabled}
              />
            </Grid>
            {errors.street || errors.city ? (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {errors.street && (
                  <Box color="red.500" as="span" fontSize="1.2rem">
                    {errors.street.message}
                  </Box>
                )}
                {errors.city && (
                  <Box color="red.500" as="span" fontSize="1.2rem">
                    {errors.city.message}
                  </Box>
                )}
              </Grid>
            ) : null}
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
              name='card_number'
              defaultValue={userInfo?.card_number || ''}

              borderColor={errors.card_number ? 'red.500' : 'gray.300'}
              {...register('card_number', { required: true })}
              isDisabled={isLoadingOrDisabled}
            />
            {errors.card_number && (
              <Box color="red.500" as="span" fontSize="1.2rem">
                {errors.card_number.message}
              </Box>
            )}
          </FormControl>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Input
              id="expiry_date"
              type="date"
              py="6"
              name='expiry_date'
              borderColor={errors.expiry_date ? 'red.500' : 'gray.300'}
              placeholder="Expiry Date"
              defaultValue={userInfo?.expiry_date || ''}

              onChange={(e) => {
                if(!e.target.value) {
                  return form.setError('expiry_date', {
                    message: 'Expiry Date is required',
                  });                }
                form.setValue('expiry_date', e.target.value);
              } }
              {...register("expiry_date", {require:true})}

              isDisabled={isLoadingOrDisabled}
            />

            <Input
              id="cvv"
              type="text"
              pattern="\d*"
              py="6"
              borderColor={errors.cvv ? 'red.500' : 'gray.300'}
              placeholder="CVV"
              name='cvv'
              {...register('cvv', { required: true })}
              maxLength="3"
              defaultValue={userInfo?.cvv || ''}

              isDisabled={isLoadingOrDisabled}
            />
            <Input
              id="card_holder_name"
              defaultValue={userInfo?.card_holder_name || ''}

              type="text"
              py="6"
              name='card_holder_name'
              placeholder="Card Holder Name"
              borderColor={errors.card_holder_name ? 'red.500' : 'gray.300'}
              {...register('card_holder_name', { required: true })}
              isDisabled={isLoadingOrDisabled}
            />
          </Grid>
          {errors['expiry_date'] || errors.cvv || errors['card_holder_name'] ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {errors['expiry_date'] && (
                <Box color="red.500" as="span" fontSize="1.2rem">
                  {errors['expiry_date'].message}
                </Box>
              )}
              {errors.cvv && (
                <Box color="red.500" as="span" fontSize="1.2rem">
                  {errors.cvv.message}
                </Box>
              )}
              {errors['card_holder_name'] && (
                <Box color="red.500" as="span" fontSize="1.2rem">
                  {errors['card_holder_name'].message}
                </Box>
              )}
            </Grid>
          ) : null}
        </Stack>
      </Stack>
    </Container>
  );
}
