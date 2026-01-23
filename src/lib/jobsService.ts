import { supabase } from './supabase';
import { Job } from '../types';

export const jobsService = {
  async getAvailableJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'available')
      .order('date_time', { ascending: true });

    if (error) throw error;

    return data.map(job => ({
      id: job.id,
      restaurantName: job.restaurant_name,
      restaurantLogo: job.restaurant_logo,
      role: job.role,
      price: job.price,
      date: job.date_time,
      duration: job.duration,
      location: job.location,
      urgentBoolean: false, // Pode ser expandido no schema se necessário
      status: job.status,
      specialty: job.specialty,
    }));
  },

  async getMyShifts(userId: string): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('freelancer_id', userId) // Assumindo que existe freelancer_id no schema real
      .order('date_time', { ascending: false });

    if (error) {
      // Fallback caso o schema seja diferente (ex: usando uma tabela de junção)
      console.warn('Error fetching shifts, check schema:', error);
      return [];
    }

    return data.map(job => ({
      id: job.id,
      restaurantName: job.restaurant_name,
      restaurantLogo: job.restaurant_logo,
      role: job.role,
      price: job.price,
      date: job.date_time,
      duration: job.duration,
      location: job.location,
      urgentBoolean: false,
      status: job.status,
    }));
  },

  async acceptJob(jobId: string, userId: string) {
    const { error } = await supabase
      .from('jobs')
      .update({ 
        status: 'booked',
        freelancer_id: userId 
      })
      .eq('id', jobId)
      .eq('status', 'available');

    if (error) throw error;
  }
};
