export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "usuario" | "escritorio" | "admin";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          nome: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          nome?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          nome?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      casos: {
        Row: {
          id: string;
          user_id: string | null;
          nome: string;
          email: string;
          telefone: string | null;
          plataforma: string;
          descricao: string;
          data_ocorrencia: string | null;
          tentativas_anteriores: string | null;
          prints_urls: string[] | null;
          status: string;
          wizard_step: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          nome: string;
          email: string;
          telefone?: string | null;
          plataforma: string;
          descricao: string;
          data_ocorrencia?: string | null;
          tentativas_anteriores?: string | null;
          prints_urls?: string[] | null;
          status?: string;
          wizard_step?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          nome?: string;
          email?: string;
          telefone?: string | null;
          plataforma?: string;
          descricao?: string;
          data_ocorrencia?: string | null;
          tentativas_anteriores?: string | null;
          prints_urls?: string[] | null;
          status?: string;
          wizard_step?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      relatorios: {
        Row: {
          id: string;
          caso_id: string | null;
          conteudo_markdown: string;
          viabilidade: string | null;
          fundamentos: string[] | null;
          precedentes: string[] | null;
          pedidos_sugeridos: string[] | null;
          pdf_url: string | null;
          aprovado_por_admin: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          caso_id?: string | null;
          conteudo_markdown: string;
          viabilidade?: string | null;
          fundamentos?: string[] | null;
          precedentes?: string[] | null;
          pedidos_sugeridos?: string[] | null;
          pdf_url?: string | null;
          aprovado_por_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          caso_id?: string | null;
          conteudo_markdown?: string;
          viabilidade?: string | null;
          fundamentos?: string[] | null;
          precedentes?: string[] | null;
          pedidos_sugeridos?: string[] | null;
          pdf_url?: string | null;
          aprovado_por_admin?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      escritorios: {
        Row: {
          id: string;
          user_id: string | null;
          nome: string;
          oab: string | null;
          especialidades: string[] | null;
          cidade: string | null;
          estado: string | null;
          email: string;
          telefone: string | null;
          plano: string;
          ativo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          nome: string;
          oab?: string | null;
          especialidades?: string[] | null;
          cidade?: string | null;
          estado?: string | null;
          email: string;
          telefone?: string | null;
          plano?: string;
          ativo?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          nome?: string;
          oab?: string | null;
          especialidades?: string[] | null;
          cidade?: string | null;
          estado?: string | null;
          email?: string;
          telefone?: string | null;
          plano?: string;
          ativo?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          relatorio_id: string | null;
          escritorio_id: string | null;
          status: string;
          visualizado_em: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          relatorio_id?: string | null;
          escritorio_id?: string | null;
          status?: string;
          visualizado_em?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          relatorio_id?: string | null;
          escritorio_id?: string | null;
          status?: string;
          visualizado_em?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      relatorios_pesquisa: {
        Row: {
          id: string;
          numero_sequencial: number;
          nome_cliente: string | null;
          referencia_interna: string | null;
          area: string;
          fatos: string;
          precedentes: string | null;
          fundamentos: string[];
          valor_estimado: number | null;
          valor_estimado_min: number | null;
          valor_estimado_max: number | null;
          valor_cobrado: number | null;
          complexidade: string | null;
          urgente: boolean | null;
          motivo_urgencia: string | null;
          via_sugerida: string | null;
          prazo_prescricional_anos: number | null;
          observacoes: string | null;
          conteudo_gerado: string | null;
          pdf_url: string | null;
          status: string;
          modelo_ia: string | null;
          codigo_acompanhamento: string | null;
          previsao_entrega: string | null;
          fila_status: string;
          solicitacao_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          numero_sequencial?: number;
          nome_cliente?: string | null;
          referencia_interna?: string | null;
          area: string;
          fatos: string;
          precedentes?: string | null;
          fundamentos?: string[];
          valor_estimado?: number | null;
          valor_estimado_min?: number | null;
          valor_estimado_max?: number | null;
          valor_cobrado?: number | null;
          complexidade?: string | null;
          urgente?: boolean | null;
          motivo_urgencia?: string | null;
          via_sugerida?: string | null;
          prazo_prescricional_anos?: number | null;
          observacoes?: string | null;
          conteudo_gerado?: string | null;
          pdf_url?: string | null;
          status?: string;
          modelo_ia?: string | null;
          codigo_acompanhamento?: string | null;
          previsao_entrega?: string | null;
          fila_status?: string;
          solicitacao_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          numero_sequencial?: number;
          nome_cliente?: string | null;
          referencia_interna?: string | null;
          area?: string;
          fatos?: string;
          precedentes?: string | null;
          fundamentos?: string[];
          valor_estimado?: number | null;
          valor_estimado_min?: number | null;
          valor_estimado_max?: number | null;
          valor_cobrado?: number | null;
          complexidade?: string | null;
          urgente?: boolean | null;
          motivo_urgencia?: string | null;
          via_sugerida?: string | null;
          prazo_prescricional_anos?: number | null;
          observacoes?: string | null;
          conteudo_gerado?: string | null;
          pdf_url?: string | null;
          status?: string;
          modelo_ia?: string | null;
          codigo_acompanhamento?: string | null;
          previsao_entrega?: string | null;
          fila_status?: string;
          solicitacao_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      pagamentos_pesquisa: {
        Row: {
          id: string;
          relatorio_id: string;
          valor: number;
          forma_pagamento: string | null;
          status: string;
          stripe_session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          relatorio_id: string;
          valor: number;
          forma_pagamento?: string | null;
          status?: string;
          stripe_session_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          relatorio_id?: string;
          valor?: number;
          forma_pagamento?: string | null;
          status?: string;
          stripe_session_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      solicitacoes_pesquisa: {
        Row: {
          id: string;
          nome: string;
          email: string;
          telefone: string | null;
          area: string;
          descricao: string;
          status: string;
          codigo_acompanhamento: string | null;
          previsao_entrega: string | null;
          fila_status: string;
          faixa_relatorio: string | null;
          relatorio_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          email: string;
          telefone?: string | null;
          area: string;
          descricao: string;
          status?: string;
          codigo_acompanhamento?: string | null;
          previsao_entrega?: string | null;
          fila_status?: string;
          faixa_relatorio?: string | null;
          relatorio_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          email?: string;
          telefone?: string | null;
          area?: string;
          descricao?: string;
          status?: string;
          codigo_acompanhamento?: string | null;
          previsao_entrega?: string | null;
          fila_status?: string;
          faixa_relatorio?: string | null;
          relatorio_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      log_ia: {
        Row: {
          id: string;
          relatorio_id: string | null;
          api_usada: string;
          modelo: string | null;
          tokens_entrada: number | null;
          tokens_saida: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          relatorio_id?: string | null;
          api_usada: string;
          modelo?: string | null;
          tokens_entrada?: number | null;
          tokens_saida?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          relatorio_id?: string | null;
          api_usada?: string;
          modelo?: string | null;
          tokens_entrada?: number | null;
          tokens_saida?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      consent_log: {
        Row: {
          id: string;
          session_id: string;
          ip_hash: string | null;
          user_agent_hash: string | null;
          versao_politica: string;
          cookies_necessarios: boolean;
          cookies_analiticos: boolean;
          data_consentimento: string;
          data_revogacao: string | null;
          origem: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          ip_hash?: string | null;
          user_agent_hash?: string | null;
          versao_politica: string;
          cookies_necessarios?: boolean;
          cookies_analiticos?: boolean;
          data_consentimento?: string;
          data_revogacao?: string | null;
          origem?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          ip_hash?: string | null;
          user_agent_hash?: string | null;
          versao_politica?: string;
          cookies_necessarios?: boolean;
          cookies_analiticos?: boolean;
          data_consentimento?: string;
          data_revogacao?: string | null;
          origem?: string;
        };
        Relationships: [];
      };
      access_log: {
        Row: {
          id: string;
          ip_hash: string;
          user_agent_hash: string | null;
          rota: string | null;
          metodo: string | null;
          status_code: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ip_hash: string;
          user_agent_hash?: string | null;
          rota?: string | null;
          metodo?: string | null;
          status_code?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ip_hash?: string;
          user_agent_hash?: string | null;
          rota?: string | null;
          metodo?: string | null;
          status_code?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      direitos_lgpd: {
        Row: {
          id: string;
          tipo: string;
          email_contato: string | null;
          descricao: string | null;
          status: string;
          prazo_resposta: string | null;
          data_resposta: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tipo: string;
          email_contato?: string | null;
          descricao?: string | null;
          status?: string;
          prazo_resposta?: string | null;
          data_resposta?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tipo?: string;
          email_contato?: string | null;
          descricao?: string | null;
          status?: string;
          prazo_resposta?: string | null;
          data_resposta?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
