import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tushar Pankhaniya — Mobile Developer Portfolio',
    short_name: 'Tushar P.',
    description:
      'Portfolio of Tushar Pankhaniya — React Native & Flutter developer building high-performance mobile applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050507',
    theme_color: '#b087ff',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
