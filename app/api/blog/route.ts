import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(req: Request) {
  console.log("🚀 API Route: /api/blog called")

  console.log("📝 Environment Variables Check:")
  console.log("  - NOTION_TOKEN exists:", !!process.env.NOTION_TOKEN)
  console.log("  - NOTION_DATABASE_ID:", DATABASE_ID)

  if (!process.env.NOTION_TOKEN || !DATABASE_ID) {
    console.error("❌ Missing Notion Environment Variables");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    console.log("📡 Querying Notion database...")
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Done",
        },
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    });

    console.log("✅ Notion query successful")
    console.log("📊 Total results:", response.results.length)
    console.log("📋 Raw results:", JSON.stringify(response.results, null, 2))

    const posts = response.results.map((page: any, index: number) => {
      const props = page.properties;

      console.log(`\n📄 Processing post ${index + 1}:`)
      console.log("  - Page ID:", page.id)
      console.log("  - Properties:", JSON.stringify(props, null, 2))

      let coverImage = "/placeholder.svg";
      if (page.cover) {
        coverImage = page.cover.type === "external"
          ? page.cover.external.url
          : page.cover.file.url;
        console.log("  - Cover image:", coverImage)
      }

      const authorData = props.Author?.people?.[0] || page.created_by;
      console.log("  - Author:", authorData?.name || page.created_by?.name)

      const post = {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
        slug: props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
        summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
        tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
        date: page.created_time,
        coverImage: coverImage,
        author: {
          name: authorData?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya"),
          avatar: authorData?.avatar_url ?? null,
        }
      };

      console.log("  - Mapped post:", JSON.stringify(post, null, 2))
      return post;
    });

    console.log("\n✅ Successfully mapped", posts.length, "posts")
    console.log("📦 Final posts array:", JSON.stringify(posts, null, 2))
    console.log("📤 Returning JSON response")

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("❌ Notion API Route Error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
}