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
    // Cache the data for 1 hour before considering it stale
    staleTime: 1000 * 60 * 60,
    // Keep the data in the cache for 2 hours
    cacheTime: 1000 * 60 * 60 * 2,
    // Refetch on window focus after data becomes stale
    refetchOnWindowFocus: true,
    // Show stale data while revalidating
    keepPreviousData: true,
  });
}

export { useAgenda }