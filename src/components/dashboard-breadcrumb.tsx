'use client';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Fragment} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getBreadcrumbItem(
    index: number,
    href: string,
    path: string,
    shouldEllipsis: boolean,
  ) {
    if (shouldEllipsis && index === 1) {
      const remainingPaths = paths.slice(1, paths.length - 2);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {remainingPaths.map((path) => {
              const href = `/${paths.slice(0, index + 1).join('/')}`;

              return (
                <DropdownMenuItem asChild key={path}>
                  <Link href={href}>{capitalize(path)}</Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (shouldEllipsis && index > 0 && index < paths.length - 2) {
      return null;
    }

    return index !== paths.length - 1 ? (
      <BreadcrumbLink asChild>
        <Link href={href}>{capitalize(path)}</Link>
      </BreadcrumbLink>
    ) : (
      <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
    );
  }

  function getBreadcrumbItems() {
    const shouldEllipsis = paths.length > 3;

    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      console.log(path);

      return (
        <Fragment key={path}>
          {index !== 0 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            {getBreadcrumbItem(index, href, path, shouldEllipsis)}
          </BreadcrumbItem>
        </Fragment>
      );
    });
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>{getBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
}
