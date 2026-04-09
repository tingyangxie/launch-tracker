"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/client";
import { SOURCE_TYPES, CATEGORIES } from "@/lib/constants";
import type {
  ReleaseCategory,
  ReleaseSource,
  Release,
  Product,
} from "@/lib/supabase/types";

interface ReleaseFormProps {
  release?: Release & { product_name?: string; organization?: string };
  products?: Product[];
}

export function ReleaseForm({ release, products = [] }: ReleaseFormProps) {
  const router = useRouter();
  const isEdit = !!release;

  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState(release?.product_name ?? "");
  const [organization, setOrganization] = useState(
    release?.organization ?? ""
  );
  const [sourceType, setSourceType] = useState<ReleaseSource>(
    (release as { source_type?: ReleaseSource })?.source_type ?? "open_source"
  );
  const [title, setTitle] = useState(release?.title ?? "");
  const [version, setVersion] = useState(release?.version ?? "");
  const [releaseDate, setReleaseDate] = useState(
    release?.release_date ?? new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState<ReleaseCategory>(
    release?.category ?? "other"
  );
  const [summary, setSummary] = useState(release?.summary ?? "");
  const [changelogUrl, setChangelogUrl] = useState(
    release?.changelog_url ?? ""
  );
  const [isMajor, setIsMajor] = useState(release?.is_major ?? false);
  const [tagsStr, setTagsStr] = useState(release?.tags?.join(", ") ?? "");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let productId = release?.product_id;

      // Find existing product or create new one
      if (!productId) {
        const existing = products.find(
          (p) => p.name.toLowerCase() === productName.toLowerCase()
        );
        if (existing) {
          productId = existing.id;
        } else {
          const { data: newProduct, error: productError } = await supabase
            .from("products")
            .insert({
              name: productName,
              organization: organization || null,
              source_type: sourceType,
              website_url: websiteUrl || null,
              repo_url: repoUrl || null,
            })
            .select()
            .single();

          if (productError) throw productError;
          productId = newProduct.id;
        }
      }

      const tags = tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        product_id: productId,
        title,
        version: version || null,
        release_date: releaseDate,
        category,
        summary: summary || null,
        changelog_url: changelogUrl || null,
        is_major: isMajor,
        tags,
      };

      if (isEdit) {
        const { error } = await supabase
          .from("releases")
          .update(payload)
          .eq("id", release.id);
        if (error) throw error;
        router.push(`/releases/${release.id}`);
      } else {
        const { data, error } = await supabase
          .from("releases")
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        router.push(`/releases/${data.id}`);
      }

      router.refresh();
    } catch (err) {
      console.error("Error saving release:", err);
      alert("Failed to save release. Check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name *</Label>
          <Input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. React, PostgreSQL"
            required
            list="product-list"
          />
          <datalist id="product-list">
            {products.map((p) => (
              <option key={p.id} value={p.name} />
            ))}
          </datalist>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g. Meta, Vercel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Release Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. React 20 Released"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g. 4.0, v2.1.0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date *</Label>
          <Input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as ReleaseCategory)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CATEGORIES).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Source Type *</Label>
          <Select
            value={sourceType}
            onValueChange={(v) => setSourceType(v as ReleaseSource)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SOURCE_TYPES).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="e.g. frontend, compiler, breaking"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Brief description of the release..."
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="changelogUrl">Changelog URL</Label>
          <Input
            id="changelogUrl"
            type="url"
            value={changelogUrl}
            onChange={(e) => setChangelogUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        {!isEdit && (
          <>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Product Website</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoUrl">Repository URL</Label>
              <Input
                id="repoUrl"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isMajor"
          checked={isMajor}
          onChange={(e) => setIsMajor(e.target.checked)}
          className="h-4 w-4 rounded border"
        />
        <Label htmlFor="isMajor">Major / Notable Release</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Release" : "Add Release"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
