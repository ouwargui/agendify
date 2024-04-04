import {ThemeToggle} from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className="border-b border-input flex max-w-screen-lg justify-between items-center w-dvw px-6 py-4 text-xl">
      <h1>Agendify</h1>
      <ThemeToggle />
    </header>
  );
}
