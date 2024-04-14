'use server';

import {createSupabaseServerClient} from '@/lib/supabase/server';
import {redirect} from 'next/navigation';
import {z} from 'zod';

const bodySchema = z
  .object({
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

export async function resetPasswordAction(formData: FormData) {
  const requestBody = {
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
  const {error} = await supabase.auth.updateUser({
    password: body.password,
  });

  if (error) {
    return {
      errors: {
        code: error.code ?? 'unknown_error',
        message: error.message,
      },
    } as const;
  }

  await supabase.auth.signOut();

  redirect('/login?resetPassword=success');
}
