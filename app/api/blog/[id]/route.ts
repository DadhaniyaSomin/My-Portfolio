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

  try {
    const page: any = await notion.pages.retrieve({
      page_id: id,
    })

    const props = page.properties

    let coverImage = "/placeholder.svg"
    if (page.cover) {
      coverImage =
        page.cover.type === "external"
          ? page.cover.external.url
          : page.cover.file.url
    }

    const authorData = props.Author?.people?.[0] || page.created_by

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

    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdString = await n2m.toMarkdownString(mdBlocks)

    console.log("Fetched post title:", post.title)

    return NextResponse.json({
      post,
      content: mdString.parent,
    })
  } catch (error: any) {
    console.error("Detail API error:", error)
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    )
  }
}
