'use client';

import {type LucideProps, Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';

import {Button, type ButtonProps} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {cn} from '@/lib/shadcn/utils';

type Props = {
  buttonProps?: ButtonProps | undefined;
  iconProps?: LucideProps | undefined;
};

export function ThemeToggle(props: Props) {
  const {setTheme, theme} = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" {...props.buttonProps}>
          <Sun
            {...props.iconProps}
            className={cn(
              'h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
              props.iconProps?.className,
            )}
          />
          <Moon
            {...props.iconProps}
            className={cn(
              'absolute h-[1.2rem] w-[1.2rem] stroke-secondary-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
              props.iconProps?.className,
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
