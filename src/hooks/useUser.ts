import {createSupabaseServerClient} from '@/lib/supabase/server';

export async function useUser() {
  const supabase = createSupabaseServerClient();
  const {data, error} = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user;
}
