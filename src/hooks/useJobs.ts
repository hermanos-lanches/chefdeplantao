import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsService } from '../lib/jobsService';
import { supabase } from '../lib/supabase';

export const useJobs = () => {
  const queryClient = useQueryClient();

  const useAvailableJobs = () => {
    return useQuery({
      queryKey: ['jobs', 'available'],
      queryFn: () => jobsService.getAvailableJobs(),
    });
  };

  const useAcceptJob = () => {
    return useMutation({
      mutationFn: ({ jobId, userId }: { jobId: string; userId: string }) => 
        jobsService.acceptJob(jobId, userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
      },
    });
  };

  return {
    useAvailableJobs,
    useAcceptJob,
  };
};
