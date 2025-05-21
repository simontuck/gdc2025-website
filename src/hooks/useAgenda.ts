import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useAgenda() {
  return useQuery({
    queryKey: ['agenda'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agenda')
        .select('*')
        .order('day', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}