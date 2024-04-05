'use client';
import {motion} from 'framer-motion';

export function HomeHero() {
  return (
    <>
      <motion.h1
        className="text-center text-5xl xs:text-6xl font-bold leading-tight xs:leading-tight md:leading-tight lg:leading-normal tracking-tighter sm:leading-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-primary/70 dark:via-primary/60 dark:to-primary to-primary text-transparent bg-clip-text bg-300% animate-gradient"
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
    </>
  );
}
