import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(req: Request) {
  if (!process.env.NOTION_TOKEN || !DATABASE_ID) {
    console.error("Missing Notion Environment Variables");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
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

    const posts = response.results.map((page: any) => {
      const props = page.properties;

     
      let coverImage = "/placeholder.svg";
      if (page.cover) {
        coverImage = page.cover.type === "external" 
          ? page.cover.external.url 
          : page.cover.file.url;
      }

      const authorData = props.Author?.people?.[0] || page.created_by;
      
      return {
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
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Notion API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
}