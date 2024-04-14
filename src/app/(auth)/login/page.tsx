import {LoginForm} from '@/components/login-form';
import {useUser} from '@/hooks/useUser';
import Link from 'next/link';
import {RedirectType, redirect} from 'next/navigation';

export default async function Login({
  searchParams,
}: {searchParams: {[key: string]: string | string[] | undefined}}) {
  const user = await useUser();
  const shouldShowResetPasswordSuccess =
    searchParams.resetPassword === 'success';

  if (user && !shouldShowResetPasswordSuccess) {
    redirect('/dashboard', RedirectType.replace);
  }

  return (
    <main className="w-full flex-1">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm
            shouldShowResetPasswordSuccess={shouldShowResetPasswordSuccess}
          />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
