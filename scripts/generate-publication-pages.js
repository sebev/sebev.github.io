const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const buildDir = path.join(root, "build");
const publications = JSON.parse(fs.readFileSync(path.join(root, "public/data/publications.json"), "utf8"));
const authors = JSON.parse(fs.readFileSync(path.join(root, "public/data/authors.json"), "utf8"));
const baseUrl = "https://sebev.github.io";

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);
}

function escapeJson(value) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}

const keys = new Set();
const sitemapUrls = [`${baseUrl}/`];
for (const publication of publications) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(publication.key)) {
        throw new Error(`Invalid publication key: ${publication.key}`);
    }
    if (keys.has(publication.key)) throw new Error(`Duplicate publication key: ${publication.key}`);
    keys.add(publication.key);

    const url = `${baseUrl}/publication/${publication.key}/`;
    sitemapUrls.push(url);
    const authorNames = publication.authors.map((id) => {
        const author = authors[id];
        return author ? `${author.firstName} ${author.lastName}` : id;
    });
    const year = new Date(publication.date).getFullYear();
    const abstract = publication.abstract || "";
    const description = abstract || `${publication.title}, published in ${publication.venue.name}.`;
    const authorMarkup = authorNames.map(escapeHtml).join(", ");
    const linksMarkup = (publication.links || []).map((link) =>
        `<li><a href="${escapeHtml(link.url)}" rel="noopener">${escapeHtml(link.type.toUpperCase())}</a></li>`
    ).join("");
    const content = `<article><p><a href="/">All publications</a></p><h1>${escapeHtml(publication.title)}</h1><p>${authorMarkup}</p><p>${escapeHtml(publication.venue.name)}${publication.venue.publisher ? `, ${escapeHtml(publication.venue.publisher)}` : ""} (${year})</p><p>${escapeHtml(publication.venue.short)} · ${escapeHtml(publication.venue.parent)}</p>${abstract ? `<h2>Abstract</h2><p>${escapeHtml(abstract).replace(/\n/g, "<br>")}</p>` : ""}${linksMarkup ? `<h2>Paper links</h2><ul>${linksMarkup}</ul>` : ""}</article>`;
    const schema = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: publication.title,
        author: authorNames.map((name) => ({ "@type": "Person", name })),
        datePublished: publication.date,
        isPartOf: publication.venue.name,
        url,
        ...(abstract ? { description: abstract } : {}),
    };

    let html = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(publication.title)} | Sebe Vanbrabant</title>`);
    html = html.replace(/<meta(?=[^>]*\bname="description")[^>]*>/s, `<meta name="description" content="${escapeHtml(description)}" />`);
    html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(publication.title)}" />`);
    html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
    html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`);
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`);
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${escapeJson(schema)}</script>`);
    html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

    const pageDir = path.join(buildDir, "publication", publication.key);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, "index.html"), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log(`Generated ${publications.length} publication pages and sitemap.xml`);
