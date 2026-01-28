---
import { getCollection } from 'astro:content'

export async function GET(context) {
  const pages = [
    { url: context.site, lastmod: new Date().toISOString() },
    { url: `${context.site}#productos`, lastmod: new Date().toISOString() },
    { url: `${context.site}#proceso`, lastmod: new Date().toISOString() },
    { url: `${context.site}#contacto`, lastmod: new Date().toISOString() },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  })
}