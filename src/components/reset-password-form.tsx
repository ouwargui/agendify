'use client';
import {resetPasswordAction} from '@/actions/reset-password';
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
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const formSchema = z
  .object({
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

export function ResetPasswordForm() {
  const {toast} = useToast();
  const {
    formState: {isSubmitting, isValid, errors, ...formState},
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.set('password', values.password);
    formData.set('confirmPassword', values.confirmPassword);

    const response = await resetPasswordAction(formData);

    if (!response) return;

    if (response.errors && response.errors.code === 'parse_error') {
      for (const field in response.errors.fieldErrors) {
        response.errors.fieldErrors[
          field as keyof typeof response.errors.fieldErrors
        ]?.forEach((message) => {
          form.setError(field as keyof typeof response.errors.fieldErrors, {
            type: 'manual',
            message,
          });
        });
      }
    }

    if (response.errors?.code) {
      toast({
        title: 'Failed to reset your password',
        description:
          response.errors?.message ??
          'An unknown error occurred, try again later.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Your password has been reset',
      description: 'You can now sign in with your new password',
      variant: 'default',
    });
  }

  return (
    <Form {...form} formState={{isSubmitting, isValid, errors, ...formState}}>
      <form className="grid gap-4" noValidate>
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem className="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="••••••••" />
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
          Reset password
        </Button>
      </form>
    </Form>
  );
}
