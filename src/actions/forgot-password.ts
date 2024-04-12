'use server';
import {createSupabaseServerClient} from '@/lib/supabase/server';
import {z} from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
});

export async function forgotPasswordAction(formData: FormData) {
  const requestBody = {
    email: formData.get('email'),
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
  const {error} = await supabase.auth.resetPasswordForEmail(body.email, {
    redirectTo: 'http://localhost:3000/reset-password',
  });

  if (error) {
    return {
      errors: {
        code: error.code ?? 'unknown_error',
        message: error.message,
      },
    } as const;
  }

  return {};
}
