import { type NextRequest } from "next/server";

export const revalidate = 600;

const SUBREDDIT_MAP: Record<string, string> = {
  all: "programming+SideProject+webdev+selfhosted+opensource+MachineLearning",
  programming: "programming",
  sideproject: "SideProject",
  webdev: "webdev",
  selfhosted: "selfhosted",
  opensource: "opensource",
  ml: "MachineLearning",
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subreddit = searchParams.get("subreddit") || "all";
  const sort = searchParams.get("sort") || "hot";

  const sub = SUBREDDIT_MAP[subreddit] || SUBREDDIT_MAP.all;

  try {
    const res = await fetch(
      `https://www.reddit.com/r/${sub}/${sort}.json?limit=30&raw_json=1`,
      {
        headers: {
          "User-Agent": "LaunchTracker/1.0 (project discovery tool)",
        },
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: `Reddit API: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const items = (data.data?.children || [])
      .filter(
        (child: Record<string, unknown>) =>
          child.kind === "t3" &&
          !(child.data as Record<string, unknown>).stickied
      )
      .map((child: Record<string, unknown>) => {
        const post = child.data as Record<string, unknown>;
        const url =
          (post.url_overridden_by_dest as string) || (post.url as string);
        const selftext = post.selftext as string | undefined;
        return {
          id: `reddit-${post.id}`,
          source: "reddit",
          title: post.title as string,
          description: selftext ? selftext.slice(0, 200) : null,
          url,
          secondaryUrl: `https://reddit.com${post.permalink}`,
          author: post.author as string,
          score: post.score as number,
          scoreLabel: "upvotes",
          commentCount: post.num_comments as number,
          tags: [
            post.link_flair_text
              ? (post.link_flair_text as string).toLowerCase()
              : null,
            (post.subreddit as string)?.toLowerCase(),
            ...(url?.includes("github.com") ? ["github"] : []),
          ].filter(Boolean),
          createdAt: new Date(
            (post.created_utc as number) * 1000
          ).toISOString(),
          subreddit: post.subreddit as string,
        };
      });

    return Response.json({ items });
  } catch {
    return Response.json(
      { error: "Failed to fetch Reddit" },
      { status: 500 }
    );
  }
}
