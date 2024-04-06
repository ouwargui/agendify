'use client';
import {Button} from '@/components/ui/button';
import {motion} from 'framer-motion';
import {ArrowRightIcon} from 'lucide-react';
import Link from 'next/link';

const MotionLink = motion(Link);

export function HomeHero() {
  return (
    <>
      <motion.h1
        className="text-center text-5xl xs:text-6xl font-bold leading-tight xs:leading-tight md:leading-tight lg:leading-normal tracking-tighter sm:leading-tight md:text-6xl lg:text-7xl text-primary"
        initial={{opacity: 0, y: 29}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.15}}
      >
        Scheduling made easy!
      </motion.h1>
      <motion.p
        className="max-w-[750px] text-center text-base md:text-xl text-muted-foreground"
        initial={{opacity: 0, y: 29}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.15, delay: 0.15}}
      >
        The easiest way for you and your clients to manage their appointments!
      </motion.p>
      <motion.p
        className="max-w-[750px] text-center text-base md:text-xl text-muted-foreground"
        initial={{opacity: 0, y: 29}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.15, delay: 0.25}}
      >
        No more back-and-forth emails, no more double bookings, no more missed
        appointments.
      </motion.p>
      <Button
        variant="default"
        size="lg"
        asChild
        className="rounded-full text-primary-foreground dark:text-secondary-foreground flex gap-4 bg-primary mt-8"
      >
        <MotionLink
          href="/signup"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.4}}
        >
          Get started for free <ArrowRightIcon />
        </MotionLink>
      </Button>
    </>
  );
}
