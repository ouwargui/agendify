'use client';
import {loginAction} from '@/actions/login';
import {signInWithOAuth} from '@/actions/oauth-sign';
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
import Link from 'next/link';
import type React from 'react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useToast} from './ui/use-toast';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

type Props = {
  shouldShowResetPasswordSuccess: boolean;
};

export function LoginForm({shouldShowResetPasswordSuccess = false}: Props) {
  const {toast} = useToast();
  const {
    formState: {isSubmitting, isValid, errors, ...formState},
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.set('email', values.email);
    formData.set('password', values.password);

    const response = await loginAction(formData);

    if (!response) return;

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
      title: 'Failed to login',
      description:
        response.errors?.message ??
        'An unknown error occurred, try again later.',
      variant: 'destructive',
    });
  }

  async function onSignInWithOAuth(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await signInWithOAuth();
  }

  useEffect(() => {
    console.log(shouldShowResetPasswordSuccess);
    if (shouldShowResetPasswordSuccess) {
      toast({
        title: 'Your password has been reset',
        description: 'You can now sign in with your new password',
        variant: 'default',
      });
    }
  }, [shouldShowResetPasswordSuccess, toast]);

  return (
    <Form {...form} formState={{isSubmitting, isValid, errors, ...formState}}>
      <form className="grid gap-4" noValidate>
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
                  autoComplete="email"
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
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input {...field} type="password" placeholder="••••••••" />
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
          Login
        </Button>
        <Button
          onClick={onSignInWithOAuth}
          variant="outline"
          className="w-full transition-all"
        >
          Login with Google
        </Button>
      </form>
    </Form>
  );
}
