'use client';

import {signOutAction} from '@/actions/sign-out';
import type {User} from '@supabase/supabase-js';
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
        .join('');
    }

    if (user.email) {
      return `${user.email.charAt(0)}${user.email.charAt(1)}`;
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
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
