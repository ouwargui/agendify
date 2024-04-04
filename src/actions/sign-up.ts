'use server';

import {createSupabaseServerClient} from '@/lib/supabase/server';
import {z} from 'zod';

const bodySchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

export async function signUpAction(formData: FormData) {
  const requestBody = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const bodyParseResult = bodySchema.safeParse(requestBody);

  if (!bodyParseResult.success) {
    return {
      errors: {
        code: 'parse_error',
        fieldErrors: bodyParseResult.error.flatten().fieldErrors,
      },
    } as const;
  }

  const supabase = createSupabaseServerClient();

  const body = bodyParseResult.data;
  const {error} = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
      },
      emailRedirectTo: 'http://localhosr:3000',
    },
  });

  if (error) {
    return {
      errors: {
        code: error.code ?? 'unknown_error',
        message: error.message,
      },
    } as const;
  }
}
