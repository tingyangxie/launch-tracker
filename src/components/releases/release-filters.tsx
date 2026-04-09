"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SOURCE_TYPES, CATEGORIES } from "@/lib/constants";
import type { ReleaseCategory, ReleaseSource } from "@/lib/supabase/types";

interface ReleaseFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: ReleaseCategory | null;
  onCategoryChange: (value: ReleaseCategory | null) => void;
  sourceType: ReleaseSource | null;
  onSourceTypeChange: (value: ReleaseSource | null) => void;
}

export function ReleaseFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sourceType,
  onSourceTypeChange,
}: ReleaseFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search releases..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select
        value={category ?? "all"}
        onValueChange={(v) =>
          onCategoryChange(v === "all" ? null : (v as ReleaseCategory))
        }
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {Object.entries(CATEGORIES).map(([key, { label }]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={sourceType ?? "all"}
        onValueChange={(v) =>
          onSourceTypeChange(v === "all" ? null : (v as ReleaseSource))
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {Object.entries(SOURCE_TYPES).map(([key, { label }]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
