'use server';

import {createSupabaseServerClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {z} from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function loginAction(formData: FormData) {
  const requestBody = {
    email: formData.get('email'),
    password: formData.get('password'),
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
  const {error} = await supabase.auth.signInWithPassword(body);

  if (error) {
    return {
      errors: {
        code: error.code ?? 'unknown_error',
        message: error.message,
      },
    } as const;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
