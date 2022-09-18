import { SupabaseClient } from '@supabase/supabase-js';

/**
 *
 * @param {SupabaseClient} client
 */
async function fetchEvent(client, id) {
  let { data, error } = await client
    .from('Events')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    return error.message;
  }
  return data;
}

export default fetchEvent;
