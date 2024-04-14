import {ResetPasswordForm} from '@/components/reset-password-form';
import {useUser} from '@/hooks/useUser';
import Link from 'next/link';
import {RedirectType, redirect} from 'next/navigation';

export default function ResetPassword() {
  const user = useUser();

  if (!user) {
    redirect('/login', RedirectType.replace);
  }

  return (
    <main className="w-full flex-1">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your new password below
            </p>
          </div>
          <ResetPasswordForm />
          <div className="mt-4 text-center text-sm">
            Remember your password?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
