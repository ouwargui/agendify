import {ThemeToggle} from '@/components/theme-toggle';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className="mx-auto w-fit">
        <ThemeToggle />
      </div>
    </div>
  );
}
