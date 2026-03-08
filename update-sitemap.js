const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('google'));
const baseUrl = 'https://alexchalu.github.io/smartcalc';

const urls = files.map(file => {
  const priority = file === 'index.html' ? '1.0' : '0.9';
  return `  <url>
    <loc>${baseUrl}/${file}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`✅ Sitemap updated with ${files.length} pages`);
