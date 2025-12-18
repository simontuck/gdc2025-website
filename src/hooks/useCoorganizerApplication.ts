import { useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface CoorganizerApplication {
  id: string;
  organization_name: string;
  website: string | null;
  contact_email: string;
  contact_phone: string | null;
  organization_type: string[];
  strategic_contribution: string;
  additional_info: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  created_at: string;
  updated_at: string;
}

export interface CoorganizerApplicationRequest {
  organization_name: string;
  website?: string;
  contact_email: string;
  contact_phone?: string;
  organization_type: string[];
  strategic_contribution: string;
  additional_info?: string;
}

export function useSubmitCoorganizerApplication() {
  return useMutation({
    mutationFn: async (application: CoorganizerApplicationRequest) => {
      const { data, error } = await supabase
        .from('coorganizer_applications')
        .insert({
          organization_name: application.organization_name,
          website: application.website || null,
          contact_email: application.contact_email,
          contact_phone: application.contact_phone || null,
          organization_type: application.organization_type,
          strategic_contribution: application.strategic_contribution,
          additional_info: application.additional_info || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data as CoorganizerApplication;
    },
  });
}
