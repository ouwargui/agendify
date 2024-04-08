import {createSupabaseServerClient} from '@/lib/supabase/server';
import type {EmailOtpType} from '@supabase/supabase-js';
import {type NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error('Missing environment variables');
  }

  const {searchParams} = new URL(request.url);
  console.log(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/dashboard';
  const redirectTo = request.nextUrl.clone();
  redirectTo.search = '';
  redirectTo.pathname = next;

  if (token_hash && type) {
    const supabase = createSupabaseServerClient();

    const {error} = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }

    console.log(error);

    const errorCode = error.code || 'unknown_error';
    // return the user to an error page with some instructions
    redirectTo.pathname = '/error';
    redirectTo.searchParams.set('code', errorCode);
    return NextResponse.redirect(redirectTo);
  }

  console.log('no token or no type');

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error';
  redirectTo.searchParams.set('code', 'unknown_error');
  return NextResponse.redirect(redirectTo);
}
