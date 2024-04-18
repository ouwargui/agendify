import {InputOTPForm} from '@/components/otp-form';
import {useUser} from '@/hooks/useUser';
import {RedirectType, redirect} from 'next/navigation';

export default async function Otp(props: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const email = props.searchParams.email as string | undefined;
  const user = await useUser();

  if (!email) {
    redirect('/login', RedirectType.replace);
  }

  if (user) {
    redirect('/dashboard', RedirectType.replace);
  }

  return (
    <main className="w-full flex-1 px-4">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Confirm your email</h1>
            <p className="text-balance text-muted-foreground">
              Enter the code we sent to your email
            </p>
          </div>
          <div className="mx-auto">
            <InputOTPForm email={email} />
          </div>
        </div>
      </div>
    </main>
  );
}
