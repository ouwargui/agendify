import type {UserResponse} from '@supabase/supabase-js';
import {type NextRequest, NextResponse} from 'next/server';

const REDIRECT_ROUTES = ['/login', '/signup', '/'];

export function redirectLoggedUser(
  request: NextRequest,
  userResponse: UserResponse,
  redirectPath = '/dashboard',
) {
  const {data} = userResponse;

  if (data.user && REDIRECT_ROUTES.includes(new URL(request.url).pathname)) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return null;
}

export function redirectNotLoggedUser(
  request: NextRequest,
  userResponse: UserResponse,
  redirectPath = '/login',
) {
  const {data} = userResponse;

  console.log(data);

  if (!data.user && !REDIRECT_ROUTES.includes(new URL(request.url).pathname)) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return null;
}
