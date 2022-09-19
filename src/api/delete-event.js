import { SupabaseClient } from '@supabase/supabase-js';

/**
 *
 * @param {SupabaseClient} client
 */
async function deleteEvent(client, id) {
  let { data, error } = await client.from('Events').delete({count:1}).eq('id', id);
  if(error){
    return false
  }
  return true
}

export default deleteEvent;
