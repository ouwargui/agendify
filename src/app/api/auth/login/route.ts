import {createSupabaseServerClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {type NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient();

  const bodyParseResult = bodySchema.safeParse(await request.json());

  if (!bodyParseResult.success) {
    return NextResponse.json(
      {error: 'Failed to parse request body', code: 'BAD_REQUEST'},
      {status: 400},
    );
  }

  const body = bodyParseResult.data;
  const {error} = await supabase.auth.signInWithPassword(body);

  if (error) {
    return NextResponse.json({error: error.message}, {status: 400});
  }

  revalidatePath('/', 'layout');
  return NextResponse.json({data: 'success'}, {status: 200});
}
