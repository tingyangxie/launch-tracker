import type { ReleaseSource, ReleaseCategory } from "./supabase/types";

export const SOURCE_TYPES: Record<
  ReleaseSource,
  { label: string; color: string; dot: string }
> = {
  big_tech: { label: "Big Tech", color: "bg-[#0052ef]", dot: "bg-[#55beff]" },
  startup: { label: "Startup", color: "bg-[#f36458]", dot: "bg-[#f36458]" },
  open_source: {
    label: "Open Source",
    color: "bg-[#19d600]",
    dot: "bg-[#19d600]",
  },
  community: {
    label: "Community",
    color: "bg-[#2a2a30]",
    dot: "bg-[#a1a1ab]",
  },
  other: { label: "Other", color: "bg-[#71717b]", dot: "bg-[#71717b]" },
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
