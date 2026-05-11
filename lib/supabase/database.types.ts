export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: { id: string; name: string; slug: string; plan: string; created_at: string; updated_at: string };
        Insert: { id?: string; name: string; slug: string; plan?: string; created_at?: string; updated_at?: string };
        Update: { id?: string; name?: string; slug?: string; plan?: string; created_at?: string; updated_at?: string };
      };
      workspaces: {
        Row: { id: string; tenant_id: string; name: string; type: string; created_at: string; updated_at: string };
        Insert: { id?: string; tenant_id: string; name: string; type?: string; created_at?: string; updated_at?: string };
        Update: { id?: string; tenant_id?: string; name?: string; type?: string; created_at?: string; updated_at?: string };
      };
      profiles: {
        Row: { id: string; tenant_id: string; email: string; full_name: string; role: Database["public"]["Enums"]["app_role"]; created_at: string; updated_at: string };
        Insert: { id: string; tenant_id: string; email: string; full_name: string; role?: Database["public"]["Enums"]["app_role"]; created_at?: string; updated_at?: string };
        Update: { id?: string; tenant_id?: string; email?: string; full_name?: string; role?: Database["public"]["Enums"]["app_role"]; created_at?: string; updated_at?: string };
      };
      brand_settings: {
        Row: { id: string; tenant_id: string; logo_url: string | null; primary_color: string; custom_domain: string | null; theme: Json; created_at: string; updated_at: string };
        Insert: { id?: string; tenant_id: string; logo_url?: string | null; primary_color?: string; custom_domain?: string | null; theme?: Json; created_at?: string; updated_at?: string };
        Update: { id?: string; tenant_id?: string; logo_url?: string | null; primary_color?: string; custom_domain?: string | null; theme?: Json; created_at?: string; updated_at?: string };
      };
      companies: {
        Row: { id: string; workspace_id: string; name: string; domain: string | null; industry: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; workspace_id: string; name: string; domain?: string | null; industry?: string | null; created_at?: string; updated_at?: string };
        Update: { id?: string; workspace_id?: string; name?: string; domain?: string | null; industry?: string | null; created_at?: string; updated_at?: string };
      };
      contacts: {
        Row: { id: string; workspace_id: string; company_id: string | null; first_name: string; last_name: string; email: string | null; phone: string | null; status: string; lead_score: number; ai_summary: string | null; custom_fields: Json; created_at: string; updated_at: string };
        Insert: { id?: string; workspace_id: string; company_id?: string | null; first_name: string; last_name: string; email?: string | null; phone?: string | null; status?: string; lead_score?: number; ai_summary?: string | null; custom_fields?: Json; created_at?: string; updated_at?: string };
        Update: { id?: string; workspace_id?: string; company_id?: string | null; first_name?: string; last_name?: string; email?: string | null; phone?: string | null; status?: string; lead_score?: number; ai_summary?: string | null; custom_fields?: Json; created_at?: string; updated_at?: string };
      };
      tags: GenericTable;
      contact_tags: GenericTable;
      pipelines: GenericTable;
      stages: GenericTable;
      deals: GenericTable;
      notes: GenericTable;
      tasks: GenericTable;
      message_threads: GenericTable;
      messages: GenericTable;
      calendars: GenericTable;
      appointments: GenericTable;
      campaigns: GenericTable;
      workflows: GenericTable;
      funnel_pages: GenericTable;
      lead_forms: GenericTable;
      reviews: GenericTable;
      products: GenericTable;
      invoices: GenericTable;
      reports: GenericTable;
      portal_items: GenericTable;
      integrations: GenericTable;
      audit_logs: GenericTable;
    };
    Views: Record<string, never>;
    Functions: {
      current_profile_tenant_id: { Args: Record<PropertyKey, never>; Returns: string };
      is_tenant_member: { Args: { target_tenant_id: string }; Returns: boolean };
      can_access_workspace: { Args: { target_workspace_id: string }; Returns: boolean };
    };
    Enums: {
      app_role: "agency_owner" | "agency_admin" | "workspace_admin" | "sales_manager" | "sales_rep" | "client_admin" | "client_viewer" | "billing_viewer";
      deal_status: "open" | "won" | "lost";
      message_channel: "email" | "sms" | "social" | "chat";
      integration_provider: "stripe" | "twilio" | "sendgrid" | "mailgun" | "google_calendar" | "meta" | "google_business_profile" | "openai" | "supabase";
    };
    CompositeTypes: Record<string, never>;
  };
};

type GenericTable = {
  Row: Record<string, Json>;
  Insert: Record<string, Json | undefined>;
  Update: Record<string, Json | undefined>;
};
