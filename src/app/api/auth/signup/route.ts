import {createSupabaseServerClient} from '@/lib/supabase/server';
import {type NextRequest, NextResponse} from 'next/server';
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
    return NextResponse.json({error: error.message}, {status: 400});
  }

  return NextResponse.json({}, {status: 201});
}
