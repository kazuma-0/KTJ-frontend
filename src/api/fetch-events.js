import { SupabaseClient } from '@supabase/supabase-js';

/**
 *
 * @param {SupabaseClient} client
 */
async function fetchEvents(client) {
  let { data, error } = await client.from('Events').select('*');

  if (error) {
    return error.message;
  }
  return data;
}

export default fetchEvents;
