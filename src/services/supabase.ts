import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://bxetqvuzgdlhzfgssswq.supabase.co' as string;
export const supabaseImagePathStorage =
  'https://bxetqvuzgdlhzfgssswq.supabase.co/storage/v1/object/public' as string;
const supabaseKey =
  import.meta.env.VITE_REACT_APP_SUPABASE_KEY ||
  ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZXRxdnV6Z2RsaHpmZ3Nzc3dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzc4NzQsImV4cCI6MjAxODgxMzg3NH0.IZQnaNSTJqo0A9C91b5LdBsb3Y_VByJvdQOHy1i2ZKY' as string);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
