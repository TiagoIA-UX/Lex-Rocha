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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
