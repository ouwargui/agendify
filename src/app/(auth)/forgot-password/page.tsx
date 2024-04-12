import {ForgotPasswordForm} from '@/components/forgot-password-form';
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <main className="w-full flex-1">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot your password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below and we&apos;ll send you a reset link if an
              account exists with that email
            </p>
          </div>
          <ForgotPasswordForm />
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
