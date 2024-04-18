'use client';

import {signOutAction} from '@/actions/sign-out';
import type {User} from '@supabase/supabase-js';
import Link from 'next/link';
import {Avatar, AvatarFallback} from './ui/avatar';
import {Button} from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Props = {
  user: User;
};

export function AvatarDropdown(props: Props) {
  function getUserInitials(user: User) {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name.charAt(0))
        .join('')
        .toUpperCase();
    }

    if (user.user_metadata?.firstName && user.user_metadata?.lastName) {
      return `${user.user_metadata.firstName.charAt(
        0,
      )}${user.user_metadata.lastName.charAt(0)}`.toUpperCase();
    }

    if (user.email) {
      return `${user.email.charAt(0)}${user.email.charAt(1)}`.toUpperCase();
    }

    return '??';
  }

  async function handleSignOut() {
    await signOutAction();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarFallback>{getUserInitials(props.user)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/account">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="w-full cursor-pointer"
            type="button"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
