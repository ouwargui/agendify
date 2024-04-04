import {signOutAction} from '@/actions/sign-out';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {createSupabaseServerClient} from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  return (
    <div>
      <div className="mx-auto w-fit">
        <ThemeToggle />
        {user.data.user?.email}
        <form action={signOutAction}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    </div>
  );
}
