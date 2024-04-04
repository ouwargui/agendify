'use client';

import {signInWithOAuth} from '@/actions/oauth-sign';
import {signUpAction} from '@/actions/sign-up';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useToast} from './ui/use-toast';

const formSchema = z
  .object({
    firstName: z.string().min(1, {
      message: 'First name is required',
    }),
    lastName: z.string().min(1, {
      message: 'Last name is required',
    }),
    email: z.string().email({
      message: 'Invalid email address',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export function SignupForm() {
  const {toast} = useToast();
  const {
    formState: {isSubmitting, isValid, errors, ...formState},
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.set('firstName', values.firstName);
    formData.set('lastName', values.lastName);
    formData.set('email', values.email);
    formData.set('password', values.password);
    formData.set('confirmPassword', values.confirmPassword);

    const response = await signUpAction(formData);

    if (response) {
      if (response.errors && response.errors.code === 'parse_error') {
        for (const field in response.errors.fieldErrors) {
          if (field !== 'email' && field !== 'password') {
            continue;
          }
          response.errors.fieldErrors[field]?.forEach((message) => {
            form.setError(field, {
              type: 'manual',
              message,
            });
          });
        }

        return;
      }

      toast({
        title: 'Failed to sign up',
        description:
          response.errors?.message ??
          'An unknown error occurred, try again later.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Confirmation email sent',
      description: 'Please check your email to confirm your account',
      variant: 'default',
    });
  }

  async function onSignInWithOAuth() {
    await signInWithOAuth();
  }

  return (
    <Form {...form} formState={{isSubmitting, isValid, errors, ...formState}}>
      <form className="grid gap-4" noValidate>
        <div className="grid xs:grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
              <FormItem className="grid gap-2">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({field}) => (
              <FormItem className="grid gap-2">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem className="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem className="grid gap-2">
              <FormLabel>Confirm your password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          Create an account
        </Button>
        <Button
          onClick={onSignInWithOAuth}
          variant="outline"
          className="w-full"
        >
          Sign up with Google
        </Button>
      </form>
    </Form>
  );
}
