'use server';

import {createSupabaseServerClient} from '@/lib/supabase/server';
import {redirect} from 'next/navigation';
import {z} from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6),
});

export async function verifyOtpAction(formData: FormData) {
  const requestBody = {
    email: formData.get('email'),
    otp: formData.get('otp'),
  };
  console.log(requestBody);
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
  const {error} = await supabase.auth.verifyOtp({
    email: bodyParseResult.data.email,
    token: bodyParseResult.data.otp,
    type: 'email',
  });

  console.log(error);
  if (error) {
    return {
      errors: {
        code: 'supabase_error',
        message: error.message,
      },
    } as const;
  }

  redirect('/dashboard');
}
