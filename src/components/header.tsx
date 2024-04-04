import {HeaderNavbar} from '@/components/header-navbar';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {useUser} from '@/hooks/useUser';
import Link from 'next/link';

export async function Header() {
  const user = await useUser();

  return (
    <header className="border-b border-input flex max-w-screen-lg justify-between items-center w-dvw px-6 py-4 text-xl">
      <Link href="/">
        <h1>Agendify</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <HeaderNavbar user={user} />
        <ThemeToggle />
      </div>
    </header>
  );
}
