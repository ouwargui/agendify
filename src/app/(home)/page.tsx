import {HomeHero} from '@/components/home-hero';

export default async function Home() {
  return (
    <div className="container flex flex-1">
      <section className="mx-auto flex flex-1 justify-center max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <HomeHero />
      </section>
    </div>
  );
}
