import {createSupabaseServerClient} from '@/lib/supabase/server';
import {RedirectType, redirect} from 'next/navigation';

export default async function Dashboard() {
  async function signOut() {
    'use server';
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/', RedirectType.replace);
  }

  return (
    <div>
      this is a dashboard bitch
      <form action={signOut}>
        <button type="submit">sign out bitch</button>
      </form>
    </div>
  );
}
