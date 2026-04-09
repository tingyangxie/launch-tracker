import { SOURCE_TYPES } from "@/lib/constants";
import type { ReleaseSource } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

export function ReleaseDot({ sourceType }: { sourceType: ReleaseSource }) {
  return (
    <span
      className={cn(
        "inline-block h-1.5 w-1.5 rounded-full",
        SOURCE_TYPES[sourceType].dot
      )}
    />
  );
}
