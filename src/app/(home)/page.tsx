import {HomeHero} from '@/components/home-hero';
import {Button} from '@/components/ui/button';
import {ArrowRightIcon} from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <HomeHero />
        <Button
          variant="default"
          size="lg"
          asChild
          className="rounded-full text-primary-foreground dark:text-secondary-foreground flex gap-4 animate-gradient from-primary via-primary/80 bg-gradient-to-r bg-300% to-primary mt-8"
        >
          <Link href="/signup">
            Get started for free <ArrowRightIcon />
          </Link>
        </Button>
      </section>
    </div>
  );
}
