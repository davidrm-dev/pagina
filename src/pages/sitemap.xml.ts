export async function GET(context) {
  const site = context.site || 'https://aromasquirences.com'
  const pages = [
    { url: site, lastmod: new Date().toISOString() },
    { url: `${site}/nosotros`, lastmod: new Date().toISOString() },
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