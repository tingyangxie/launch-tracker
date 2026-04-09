"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { format, parseISO } from "date-fns";
import { ArrowLeft, ExternalLink, GitBranch, Star, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { SOURCE_TYPES, CATEGORIES } from "@/lib/constants";
import type { ReleaseWithProduct } from "@/lib/supabase/types";

export default function ReleaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [release, setRelease] = useState<ReleaseWithProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from("releases_with_product")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setRelease(data as ReleaseWithProduct);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this release?")) return;
    const { error } = await supabase.from("releases").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Failed to delete release.");
    } else {
      router.push("/releases");
    }
  }

  if (loading) {
    return <div className="h-48 animate-pulse rounded-lg bg-muted" />;
  }

  if (!release) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Release not found.</p>
        <Link href="/releases">
          <Button variant="outline" className="mt-4">
            Back to Releases
          </Button>
        </Link>
      </div>
    );
  }

  const source = SOURCE_TYPES[release.source_type];
  const category = CATEGORIES[release.category];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/releases">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="flex-1 text-2xl font-bold">
          {release.title}
          {release.is_major && (
            <Star className="ml-2 inline h-5 w-5 text-amber-500" />
          )}
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Product</p>
              <p className="font-medium">{release.product_name}</p>
            </div>
            {release.organization && (
              <div>
                <p className="text-sm text-muted-foreground">Organization</p>
                <p className="font-medium">{release.organization}</p>
              </div>
            )}
            {release.version && (
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-medium">{release.version}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Release Date</p>
              <p className="font-medium">
                {format(parseISO(release.release_date), "MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary">{source.label}</Badge>
            <Badge variant="outline">{category.label}</Badge>
            {release.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {release.summary && (
            <div>
              <p className="text-sm text-muted-foreground">Summary</p>
              <p className="mt-1">{release.summary}</p>
            </div>
          )}

          <div className="flex gap-3">
            {release.website_url && (
              <a
                href={release.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Website
                </Button>
              </a>
            )}
            {release.repo_url && (
              <a
                href={release.repo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <GitBranch className="h-4 w-4" />
                  Repository
                </Button>
              </a>
            )}
            {release.changelog_url && (
              <a
                href={release.changelog_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Changelog
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      <Link href={`/notes/${release.release_date}`}>
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          View notes for {format(parseISO(release.release_date), "MMM d, yyyy")}
        </Button>
      </Link>
    </div>
  );
}
