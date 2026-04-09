export type ReleaseSource =
  | "big_tech"
  | "startup"
  | "open_source"
  | "community"
  | "other";

export type ReleaseCategory =
  | "ai_ml"
  | "web_framework"
  | "mobile"
  | "database"
  | "devtools"
  | "language_runtime"
  | "os_platform"
  | "security"
  | "cloud_infra"
  | "design"
  | "hardware"
  | "other";

export interface Product {
  id: string;
  name: string;
  organization: string | null;
  source_type: ReleaseSource;
  website_url: string | null;
  repo_url: string | null;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Release {
  id: string;
  product_id: string;
  version: string | null;
  title: string;
  release_date: string;
  category: ReleaseCategory;
  summary: string | null;
  changelog_url: string | null;
  is_major: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ReleaseWithProduct extends Release {
  product_name: string;
  organization: string | null;
  source_type: ReleaseSource;
  logo_url: string | null;
  website_url: string | null;
  repo_url: string | null;
}

export interface DailyNote {
  id: string;
  note_date: string;
  content: string;
  release_ids: string[];
  created_at: string;
  updated_at: string;
}
