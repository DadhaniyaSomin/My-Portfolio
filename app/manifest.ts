import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || 'Somin Dadhaniya'
  return {
    name: `${fullName} — Backend Software Engineer Portfolio`,
    short_name: fullName,
    description:
      `Portfolio of ${fullName} — Backend Software Engineer specializing in scalable systems, RESTful APIs, Golang, Laravel, Docker, and cloud-native infrastructure.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#050507',
    theme_color: '#CCFF00'
  }
}
