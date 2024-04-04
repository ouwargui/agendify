'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {cn} from '@/lib/shadcn/utils';
import type {User} from '@supabase/supabase-js';
import {ArrowRight} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

type Props = {
  user: User | null;
};

export function HeaderNavbar(props: Props) {
  const pathname = usePathname();

  return !props.user ? (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                'bg-accent text-accent-foreground': pathname.includes('login'),
              })}
            >
              Login
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/signup" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                'bg-accent text-accent-foreground': pathname.includes('signup'),
              })}
            >
              Sign up
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ) : (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'gap-2 bg-primary hover:bg-primary/90 focus:bg-primary/90 text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground dark:text-primary-foreground',
              )}
            >
              Go to dashboard <ArrowRight />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
