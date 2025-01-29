export async function GET() {
    const siteUrl = "https://dune70.com";
    const lastmod = new Date().toISOString();
  
    const links = [
      { href: "/" },
      { href: "/about/" },
      { href: "/merch/" },
      { href: "/contact/" },
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${links
        .map(
          (link) => `
        <url>
          <loc>${siteUrl}${link.href}</loc>
          <lastmod>${lastmod}</lastmod>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;
  
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
  