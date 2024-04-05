import {signOutAction} from '@/actions/sign-out';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {createSupabaseServerClient} from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight md:leading-tight tracking-tighter md:text-6xl bg-gradient-to-r from-primary via-primary/70 dark:via-primary/60 dark:to-primary to-primary text-transparent bg-clip-text bg-300% animate-gradient">
          Scheduling made easy!
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-base">
          The easiest way for you and your clients to manage their appointments!
          <br />
          No more back-and-forth emails, no more double bookings, no more missed
          appointments.
        </p>
      </section>
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
