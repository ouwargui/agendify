import {HeaderNavbar} from '@/components/header-navbar';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {useUser} from '@/hooks/useUser';
import Link from 'next/link';

// supports-[backdrop-filter]:bg-background/60 bg-background/95

export async function Header() {
  const user = await useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur">
      <div className="container flex max-w-screen-2xl items-center justify-between py-4">
        <Link href="/">
          <span className="font-bold inline-block text-3xl text-primary">
            agendify.
          </span>
        </Link>
        <div className="flex gap-4 items-center">
          <div className="hidden sm:block">
            <HeaderNavbar user={user} />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
