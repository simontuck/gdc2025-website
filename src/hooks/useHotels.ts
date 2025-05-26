import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useHotels() {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('ready_to_publish', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}