import {createSupabaseServerClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  const {searchParams, origin} = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createSupabaseServerClient();
    const {error} = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      revalidatePath('/', 'layout');
      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/error?code=${error.code}`);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/error?code=unknown_error`);
}
