import { supabase } from './supabase';

export const verificationService = {
  /**
   * Faz o upload de um documento para o Storage privado e registra no banco
   */
  async uploadDocument(userId: string, type: 'identity_front' | 'identity_back' | 'selfie', file: File) {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${type}_${Math.random()}.${fileExt}`;

    // 1. Upload para o Storage (Bucket privado 'documents')
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Registrar na tabela de documentos
    const { error: dbError } = await supabase
      .from('profile_documents')
      .insert({
        profile_id: userId,
        document_type: type,
        file_path: filePath
      });

    if (dbError) throw dbError;
  },

  /**
   * Inicia o processo de verificação automática via Edge Function
   */
  async startAutomaticVerification(userId: string) {
    const { data, error } = await supabase.functions.invoke('verify-identity', {
      body: { userId }
    });

    if (error) throw error;
    return data; // Retorna se foi aprovado ou se entrou em revisão manual
  },

  /**
   * Busca o status atual de verificação do perfil
   */
  async getVerificationStatus(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('verification_status, is_verified')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
};
