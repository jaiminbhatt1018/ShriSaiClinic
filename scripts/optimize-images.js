import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  'D:/project/Shree Sai Clinic/ShreeSaiClinic-React/public/assets/images',
  'D:/project/Shree Sai Clinic/ShreeSaiClinic-React/public/assets/cases'
];

async function convertDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')) {
      const input = path.join(dir, f);
      const ext = path.extname(f);
      const output = path.join(dir, path.basename(f, ext) + '.webp');

      const origSize = fs.statSync(input).size;
      await sharp(input).webp({ quality: 85 }).toFile(output);
      const newSize = fs.statSync(output).size;
      const savings = (((origSize - newSize) / origSize) * 100).toFixed(1);
      console.log(`Converted ${f} -> ${path.basename(output)} (${(origSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB, -${savings}%)`);
    }
  }
}

async function run() {
  for (const d of dirs) {
    if (fs.existsSync(d)) {
      await convertDir(d);
    }
  }
  console.log('All WebP conversions completed successfully.');
}

run();
