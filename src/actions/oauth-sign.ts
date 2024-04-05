'use server';

import {createSupabaseServerClient} from '@/lib/supabase/server';
import {redirect} from 'next/navigation';

const APP_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://agendify.vercel.app'
    : 'http://localhost:3000';

export async function signInWithOAuth() {
  const supabase = createSupabaseServerClient();
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${APP_URL}/api/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Error signing in with OAuth', error);
    return;
  }

  if (data.url) {
    console.log('Redirecting to', data.url);
    const redirectTo = new URL(data.url);
    redirect(redirectTo.href); // use the redirect API for your server framework
  }
}
