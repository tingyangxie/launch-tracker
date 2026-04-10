import { type NextRequest } from "next/server";

export const revalidate = 300;

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  tag_list: string[];
  user: { name: string; username: string };
  positive_reactions_count: number;
  comments_count: number;
  published_at: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get("tag") || "";
  const period = searchParams.get("period") || "week";

  const topDays = period === "day" ? 1 : period === "week" ? 7 : 30;

  let apiUrl = `https://dev.to/api/articles?per_page=30&top=${topDays}`;
  if (tag) apiUrl += `&tag=${encodeURIComponent(tag)}`;

  try {
    const res = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return Response.json(
        { error: `Dev.to API: ${res.status}` },
        { status: 502 }
      );
    }

    const articles: DevToArticle[] = await res.json();
    const items = articles.map((article) => ({
      id: `devto-${article.id}`,
      source: "devto",
      title: article.title,
      description: article.description || null,
      url: article.url,
      author: article.user.username,
      score: article.positive_reactions_count,
      scoreLabel: "reactions",
      commentCount: article.comments_count,
      tags: article.tag_list.slice(0, 5),
      createdAt: article.published_at,
    }));

    return Response.json({ items });
  } catch {
    return Response.json(
      { error: "Failed to fetch Dev.to" },
      { status: 500 }
    );
  }
}
