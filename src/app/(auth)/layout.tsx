import {Header} from '@/components/header';
import {createSupabaseServerClient} from '@/lib/supabase/server';
import type {Metadata} from 'next';
import {redirect} from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  if (user.data.user) {
    redirect('/dashboard');
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}