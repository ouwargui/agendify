import type {UserResponse} from '@supabase/supabase-js';
import {type NextRequest, NextResponse} from 'next/server';

const REDIRECT_ROUTES = ['/login', '/signup'];

export function redirectLoggedUser(
  request: NextRequest,
  userResponse: UserResponse,
  redirectPath: string,
) {
  const {data} = userResponse;

  if (data.user && REDIRECT_ROUTES.includes(new URL(request.url).pathname)) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return null;
}
