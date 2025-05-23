import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useSpeakers() {
  return useQuery({
    queryKey: ['speakers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .eq('ready_to_publish', true)
        .order('fullname', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}