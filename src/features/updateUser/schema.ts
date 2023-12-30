import * as z from 'zod';
import { ACCEPTED_IMAGE_TYPES, MB_BYTES, formatDate } from '@/lib/helper';

const stepOneValues = {
  full_name: '',
  phone: '',
  date_of_birth: new Date(),
  gender: '',
  avatar_url: undefined,
};
const stepTwoValues = {
  street: '',
  city: '',
  card_number: '',
  expiry_date: new Date(),
  cvv: '',
  card_holder_name: '',
};

const updateUserSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: 'Full name is required.' })
    .min(2, { message: 'Full name must be at least 2 characters long.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),

  date_of_birth: z
    .string()
    .min(1, { message: 'Date of birth is required.' })
    .refine((dateString) => formatDate(dateString) <= new Date(), {
      message: 'Date of birth cannot be in the future.',
    }),

  gender: z.string().min(1, { message: 'Gender is required.' }),
  avatar_url: z
    .any()
    .refine((file) => file?.size <= MB_BYTES * 2, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),

  street: z.string().min(1, { message: 'Street is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  card_number: z
    .string()
    .min(1, { message: 'Card number is required.' })
    .min(20, { message: 'Card number must be at least 20 characters long.' }),
  expiry_date: z
    .string()
    .min(1, { message: 'Expiry date is required.' })
    .refine((dateString) => formatDate(dateString) <= new Date(), {
      message: 'Expire date cannot be in the future.',
    }),
  cvv: z
    .string()
    .min(1, { message: 'CVV is required.' })
    .min(3, { message: 'CVV must be at least 3 characters long.' })
    .max(3, { message: 'CVV can be at most 3 characters long.' })
    .refine((cvv) => !isNaN(Number(cvv)), { message: 'CVV must be a number.' }),
  card_holder_name: z
    .string()
    .min(1, { message: 'Card holder name is required.' }),
});
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
export { stepOneValues, stepTwoValues, updateUserSchema };
