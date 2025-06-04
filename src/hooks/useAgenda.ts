import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useAgenda() {
  return useQuery({
    queryKey: ['agenda'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('agenda')
          .select('*')
          .eq('ready_to_publish', true)
          .order('day', { ascending: true })
          .order('time', { ascending: true });

        if (error) {
          throw new Error(`Error fetching agenda: ${error.message}`);
        }

        if (!data) {
          return [];
        }

        return data;
      } catch (error) {
        console.error('Failed to fetch agenda:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}