import { type NextRequest } from "next/server";

export const revalidate = 600;

const SUBREDDIT_MAP: Record<string, string[]> = {
  all: [
    "programming",
    "SideProject",
    "webdev",
    "selfhosted",
    "opensource",
    "MachineLearning",
  ],
  programming: ["programming"],
  sideproject: ["SideProject"],
  webdev: ["webdev"],
  selfhosted: ["selfhosted"],
  opensource: ["opensource"],
  ml: ["MachineLearning"],
};

interface RedditPost {
  id: string;
  title: string;
  selftext?: string;
  url: string;
  url_overridden_by_dest?: string;
  permalink: string;
  author: string;
  score: number;
  num_comments: number;
  link_flair_text?: string;
  subreddit: string;
  created_utc: number;
  stickied: boolean;
}

async function fetchSubreddit(sub: string, sort: string) {
  // old.reddit.com is more permissive with server-side requests
  const res = await fetch(
    `https://old.reddit.com/r/${sub}/${sort}.json?limit=15&raw_json=1`,
    {
      headers: {
        "User-Agent":
          "web:launch-tracker:v1.0.0 (server-side project discovery)",
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Reddit r/${sub}: ${res.status}`);
  }

  const data = await res.json();
  return (data.data?.children || [])
    .filter(
      (child: { kind: string; data: RedditPost }) =>
        child.kind === "t3" && !child.data.stickied
    )
    .map((child: { data: RedditPost }) => {
      const post = child.data;
      const url = post.url_overridden_by_dest || post.url;
      return {
        id: `reddit-${post.id}`,
        source: "reddit" as const,
        title: post.title,
        description: post.selftext ? post.selftext.slice(0, 200) : null,
        url,
        secondaryUrl: `https://reddit.com${post.permalink}`,
        author: post.author,
        score: post.score,
        scoreLabel: "upvotes",
        commentCount: post.num_comments,
        tags: [
          post.link_flair_text ? post.link_flair_text.toLowerCase() : null,
          post.subreddit.toLowerCase(),
          ...(url?.includes("github.com") ? ["github"] : []),
        ].filter(Boolean),
        createdAt: new Date(post.created_utc * 1000).toISOString(),
        subreddit: post.subreddit,
      };
    });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subreddit = searchParams.get("subreddit") || "all";
  const sort = searchParams.get("sort") || "hot";

  const subs = SUBREDDIT_MAP[subreddit] || SUBREDDIT_MAP.all;

  try {
    // Fetch subreddits individually to avoid multi-sub URL issues
    const results = await Promise.allSettled(
      subs.map((sub) => fetchSubreddit(sub, sort))
    );

    const allItems = [];
    const errors: string[] = [];

    for (const result of results) {
      if (result.status === "fulfilled") {
        allItems.push(...result.value);
      } else {
        errors.push(result.reason?.message || "Unknown error");
      }
    }

    // Sort by score descending
    allItems.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );

    if (allItems.length === 0 && errors.length > 0) {
      return Response.json(
        { error: `Reddit API errors: ${errors.join("; ")}`, items: [] },
        { status: 502 }
      );
    }

    return Response.json({ items: allItems });
  } catch (err) {
    return Response.json(
      {
        error: `Failed to fetch Reddit: ${err instanceof Error ? err.message : "unknown"}`,
        items: [],
      },
      { status: 500 }
    );
  }
}
