import { type NextRequest } from "next/server";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter = searchParams.get("filter") || "top";
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "0";

  let apiUrl: string;

  switch (filter) {
    case "show_hn":
      apiUrl = `https://hn.algolia.com/api/v1/search?tags=show_hn&hitsPerPage=30&page=${page}`;
      if (query) apiUrl += `&query=${encodeURIComponent(query)}`;
      break;
    case "launches":
      apiUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query || "launch OR release OR announce OR \"open source\"")}&tags=story&hitsPerPage=30&page=${page}`;
      break;
    case "newest":
      apiUrl = `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=30&page=${page}`;
      if (query) apiUrl += `&query=${encodeURIComponent(query)}`;
      break;
    default:
      apiUrl = `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=30&page=${page}`;
      if (query) apiUrl += `&query=${encodeURIComponent(query)}`;
  }

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return Response.json(
        { error: `HN Algolia API: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const items = (data.hits || [])
      .filter((hit: Record<string, unknown>) => hit.url)
      .map((hit: Record<string, unknown>) => {
        const url = hit.url as string;
        const title = hit.title as string;
        return {
          id: `hn-${hit.objectID}`,
          source: "hackernews",
          title,
          description: null,
          url,
          secondaryUrl: `https://news.ycombinator.com/item?id=${hit.objectID}`,
          author: hit.author as string,
          score: (hit.points as number) || 0,
          scoreLabel: "points",
          commentCount: (hit.num_comments as number) || 0,
          tags: [
            ...(url?.includes("github.com") ? ["github"] : []),
            ...(title?.toLowerCase().startsWith("show hn") ? ["show-hn"] : []),
          ],
          createdAt: hit.created_at as string,
        };
      });

    return Response.json({ items, totalPages: data.nbPages || 1 });
  } catch {
    return Response.json(
      { error: "Failed to fetch Hacker News" },
      { status: 500 }
    );
  }
}
