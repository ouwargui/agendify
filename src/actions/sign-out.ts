'use server';

import {createSupabaseServerClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

export async function signOutAction() {
  const supabase = createSupabaseServerClient();

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}
