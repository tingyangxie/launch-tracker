import type { ReleaseSource, ReleaseCategory } from "./supabase/types";

export const SOURCE_TYPES: Record<
  ReleaseSource,
  { label: string; color: string; dot: string }
> = {
  big_tech: { label: "Big Tech", color: "bg-blue-500", dot: "bg-blue-400" },
  startup: { label: "Startup", color: "bg-purple-500", dot: "bg-purple-400" },
  open_source: {
    label: "Open Source",
    color: "bg-green-500",
    dot: "bg-green-400",
  },
  community: {
    label: "Community",
    color: "bg-orange-500",
    dot: "bg-orange-400",
  },
  other: { label: "Other", color: "bg-gray-500", dot: "bg-gray-400" },
};

export const CATEGORIES: Record<ReleaseCategory, { label: string }> = {
  ai_ml: { label: "AI / ML" },
  web_framework: { label: "Web Framework" },
  mobile: { label: "Mobile" },
  database: { label: "Database" },
  devtools: { label: "Dev Tools" },
  language_runtime: { label: "Language / Runtime" },
  os_platform: { label: "OS / Platform" },
  security: { label: "Security" },
  cloud_infra: { label: "Cloud / Infra" },
  design: { label: "Design" },
  hardware: { label: "Hardware" },
  other: { label: "Other" },
};
