import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_API_KEY, SUPABASE_URL } from '../config';
const client = new SupabaseClient(SUPABASE_URL, SUPABASE_API_KEY, {});
export default client;
