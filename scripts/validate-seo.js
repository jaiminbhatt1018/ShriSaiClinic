import fs from 'fs';

const html = fs.readFileSync('dist/index.html', 'utf8');
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

if (!match) {
  console.error('❌ No JSON-LD found in dist/index.html');
  process.exit(1);
}

try {
  const json = JSON.parse(match[1]);
  console.log('✅ JSON-LD Parsed Successfully!');
  console.log('Context:', json['@context']);
  console.log('Entities count:', json['@graph'].length);
  for (const entity of json['@graph']) {
    console.log(` - ${entity['@type']}: "${entity.name}" (ID: ${entity['@id']})`);
  }
} catch (e) {
  console.error('❌ Failed to parse JSON-LD:', e.message);
  process.exit(1);
}

// Check robots.txt
if (fs.existsSync('dist/robots.txt')) {
  console.log('✅ dist/robots.txt exists and is deployed.');
} else {
  console.error('❌ dist/robots.txt missing!');
}

// Check sitemap.xml
if (fs.existsSync('dist/sitemap.xml')) {
  console.log('✅ dist/sitemap.xml exists and is deployed.');
} else {
  console.error('❌ dist/sitemap.xml missing!');
}
