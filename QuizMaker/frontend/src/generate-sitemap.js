const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/create', changefreq: 'weekly', priority: 0.8 },
];

const sitemap = new SitemapStream({ hostname: 'https://quakkyquizzy.harshmaster.me' });

streamToPromise(links.forEach(link => sitemap.write(link)))
  .then(() => {
    sitemap.end();
    sitemap.pipe(createWriteStream('public/sitemap.xml'));
  })
  .catch(console.error);
