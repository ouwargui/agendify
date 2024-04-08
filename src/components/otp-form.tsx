'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {verifyOtpAction} from '@/actions/verify-otp';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {InputOTP, InputOTPGroup, InputOTPSlot} from '@/components/ui/input-otp';
import {RedirectType, redirect, useSearchParams} from 'next/navigation';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export function InputOTPForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') as string;
  if (!email) {
    redirect('/login', RedirectType.replace);
  }

  const {
    formState: {isSubmitting, isValid, errors, ...formState},
    ...form
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.set('email', email);
    formData.set('otp', data.pin);

    const response = await verifyOtpAction(formData);

    if (response) {
      if (response.errors && response.errors.code === 'parse_error') {
        form.setError('pin', {
          type: 'manual',
          message: 'Something went wrong, try again later',
        });
      }

      if (response.errors && response.errors.code === 'supabase_error') {
        form.setError('pin', {
          type: 'manual',
          message: response.errors.message,
        });
      }

      return;
    }
  }

  return (
    <Form {...form} formState={{isSubmitting, isValid, errors, ...formState}}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="h-20 w-10 xs:h-15 sx:w-15 md:w-20 md:h-20 text-lg"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-20 w-10 xs:h-15 sx:w-15 md:w-20 md:h-20 text-lg"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-20 w-10 xs:h-15 sx:w-15 md:w-20 md:h-20 text-lg"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-20 w-10 xs:h-15 sx:w-15 md:w-20 md:h-20 text-lg"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-20 w-10 xs:h-15 sx:w-15 md:w-20 md:h-20 text-lg"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-20 w-10 xs:h-15 sx:w-15 md:w-20 md:h-20 text-lg"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
