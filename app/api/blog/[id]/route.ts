import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  console.log("🚀 API Route: /api/blog/[id] called")
  console.log("📝 Page ID:", id)

  try {
    console.log("📡 Retrieving page from Notion...")
    const page: any = await notion.pages.retrieve({
      page_id: id,
    })

    console.log("✅ Page retrieved successfully")
    console.log("📄 Page properties:", JSON.stringify(page.properties, null, 2))

    const props = page.properties

    let coverImage = "/placeholder.svg"
    if (page.cover) {
      coverImage =
        page.cover.type === "external"
          ? page.cover.external.url
          : page.cover.file.url
      console.log("🖼️ Cover image:", coverImage)
    }

    const authorData = props.Author?.people?.[0] || page.created_by
    console.log("👤 Author:", authorData?.name || page.created_by?.name)

    const post = {
      id: page.id,
      slug: page.id,
      title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
      summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
      tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
      date: page.created_time,
      coverImage,
      author: {
        name: authorData?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya"),
        avatar: authorData?.avatar_url ?? null,
      },
    }

    console.log("📦 Post object:", JSON.stringify(post, null, 2))

    console.log("📝 Converting page to Markdown...")
    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdString = await n2m.toMarkdownString(mdBlocks)

    console.log("✅ Markdown conversion successful")
    console.log("📄 Markdown length:", mdString.parent?.length || 0)
    console.log("📤 Returning JSON response with post and content")

    return NextResponse.json({
      post,
      content: mdString.parent,
    })
  } catch (error: any) {
    console.error("❌ Detail API error:", error)
    console.error("Error details:", JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    )
  }
}
