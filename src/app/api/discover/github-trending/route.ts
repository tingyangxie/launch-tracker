import { type NextRequest } from "next/server";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timeRange = searchParams.get("timeRange") || "weekly";
  const language = searchParams.get("language") || "";

  const daysBack = timeRange === "daily" ? 1 : timeRange === "weekly" ? 7 : 30;
  const since = new Date(Date.now() - daysBack * 86400000)
    .toISOString()
    .split("T")[0];

  let query = `created:>${since} stars:>10`;
  if (language) query += ` language:${language}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`,
      { headers }
    );

    if (!res.ok) {
      return Response.json(
        { error: `GitHub API: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const items = (data.items || []).map(
      (item: Record<string, unknown>) => ({
        id: `gh-${item.id}`,
        source: "github_trending",
        title: item.full_name as string,
        description: item.description as string | null,
        url: item.html_url as string,
        author: (item.owner as Record<string, unknown>)?.login ?? "",
        score: item.stargazers_count as number,
        scoreLabel: "stars",
        commentCount: item.open_issues_count as number,
        language: item.language as string | null,
        tags: (item.topics as string[]) ?? [],
        createdAt: item.created_at as string,
        repoFullName: item.full_name as string,
        repoUrl: item.html_url as string,
        homepage: item.homepage as string | null,
        forks: item.forks_count as number,
      })
    );

    return Response.json({ items });
  } catch {
    return Response.json(
      { error: "Failed to fetch GitHub trending" },
      { status: 500 }
    );
  }
}
