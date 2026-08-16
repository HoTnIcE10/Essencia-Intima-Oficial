import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createNoopClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: { message: "Supabase não configurado." } }),
      signUp: async () => ({ data: null, error: { message: "Supabase não configurado." } }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: async () => ({ data: [], error: null }),
        }),
        order: async () => ({ data: [], error: null }),
      }),
    }),
  } as any;
}

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    return createNoopClient();
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
