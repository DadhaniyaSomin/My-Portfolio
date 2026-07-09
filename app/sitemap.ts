import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic blog pages — fetch from API
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${SITE_URL}/api/blog`, {
      headers: {
        'x-api-secret': process.env.INTERNAL_API_SECRET || '',
      },
      next: { revalidate: 3600 },
    })

    if (res.ok) {
      const posts = await res.json()
      blogPages = posts.map((post: { id: string; date?: string }) => ({
        url: `${SITE_URL}/blog/${post.id}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error generating sitemap blog entries:', error)
  }

  return [...staticPages, ...blogPages]
}
