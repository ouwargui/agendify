'use client';
import {forgotPasswordAction} from '@/actions/forgot-password';
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

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
});

export function ForgotPasswordForm() {
  const {toast} = useToast();
  const {
    formState: {isSubmitting, isValid, errors, ...formState},
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.set('email', values.email);

    const response = await forgotPasswordAction(formData);

    if (!response) return;

    if (response.errors && response.errors.code === 'parse_error') {
      for (const field in response.errors.fieldErrors) {
        if (field !== 'email') {
          continue;
        }
        response.errors.fieldErrors[field]?.forEach((message) => {
          form.setError(field, {
            type: 'manual',
            message,
          });
        });
      }
    }

    if (response.errors?.code) {
      toast({
        title: 'Failed to send reset link',
        description:
          response.errors?.message ??
          'An unknown error occurred, try again later.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Reset link sent',
      description: 'Check your email for a reset link',
      variant: 'default',
    });
  }

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
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          Send reset link
        </Button>
      </form>
    </Form>
  );
}
