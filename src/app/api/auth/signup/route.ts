import {createSupabaseServerClient} from '@/lib/supabase/server';
import {type NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

const bodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
      });
    }
  });

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient();

  const bodyParseResult = bodySchema.safeParse(await request.json());

  if (!bodyParseResult.success) {
    if (bodyParseResult.error.formErrors.fieldErrors.confirmPassword) {
      return NextResponse.json(
        {
          error: 'Passwords do not match',
          code: 'BAD_REQUEST',
        },
        {status: 400},
      );
    }

    return NextResponse.json(
      {error: 'Failed to parse request body', code: 'BAD_REQUEST'},
      {status: 400},
    );
  }

  const body = bodyParseResult.data;
  const {error} = await supabase.auth.signUp(body);

  if (error) {
    return NextResponse.json({error: error.message}, {status: 400});
  }

  return NextResponse.json({}, {status: 201});
}
