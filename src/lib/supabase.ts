import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auto-setup function to create necessary tables and policies
export async function setupSupabase() {
  try {
    // Create tables
    await supabase.from('projects').select('count').single();
    await supabase.from('achievements').select('count').single();
    await supabase.from('blog_posts').select('count').single();
    await supabase.from('creative_highlights').select('count').single();
  } catch (error) {
    console.error('Error setting up Supabase:', error);
  }
}