import { type NextRequest } from "next/server";

export const revalidate = 600;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const topic = searchParams.get("topic") || "";

  const since = new Date(Date.now() - 7 * 86400000)
    .toISOString()
    .split("T")[0];

  let query = `stars:>500 pushed:>${since}`;
  if (topic) query += ` topic:${topic}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=30`,
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
        id: `ghr-${item.id}`,
        source: "github_releases",
        title: item.full_name as string,
        description: item.description as string | null,
        url: item.html_url as string,
        author: (item.owner as Record<string, unknown>)?.login ?? "",
        score: item.stargazers_count as number,
        scoreLabel: "stars",
        language: item.language as string | null,
        tags: (item.topics as string[]) ?? [],
        createdAt: (item.pushed_at || item.updated_at) as string,
        repoFullName: item.full_name as string,
        repoUrl: item.html_url as string,
        homepage: item.homepage as string | null,
        forks: item.forks_count as number,
      })
    );

    return Response.json({ items });
  } catch {
    return Response.json(
      { error: "Failed to fetch GitHub releases" },
      { status: 500 }
    );
  }
}
