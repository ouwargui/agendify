import {RedirectType, redirect} from 'next/navigation';

export default async function NotFound() {
  redirect('/dashboard', RedirectType.replace);
}
