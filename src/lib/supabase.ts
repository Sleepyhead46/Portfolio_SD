import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

// Support both the legacy "anon key" and the newer "publishable key" naming.
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

// Lazily create the client only when env vars are available.
// This keeps the build working on GitHub Pages even before env vars are configured.
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  created_at?: string;
};
