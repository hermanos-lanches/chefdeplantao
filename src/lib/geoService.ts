import { supabase } from './supabase';

export const geoService = {
  /**
   * Converte coordenadas para o formato PostGIS Point
   */
  formatPoint(lat: number, lng: number) {
    return `POINT(${lng} ${lat})`;
  },

  /**
   * Busca vagas próximas usando a função RPC do Supabase (PostGIS)
   */
  async getNearbyJobs(lat: number, lng: number, radiusInMeters: number = 50000) {
    const { data, error } = await supabase.rpc('get_nearby_jobs', {
      lat,
      lng,
      radius_meters: radiusInMeters
    });

    if (error) throw error;
    return data;
  },

  /**
   * Atualiza a localização do usuário (Restaurante ou Profissional)
   */
  async updateUserLocation(userId: string, lat: number, lng: number, addressText: string) {
    const { error } = await supabase
      .from('profiles')
      .update({
        location: this.formatPoint(lat, lng),
        address_text: addressText
      })
      .eq('id', userId);

    if (error) throw error;
  }
};
