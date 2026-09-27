import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public', 'assets');

async function processImages() {
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(assetsDir, file);
      const outputFilename = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const outputPath = path.join(assetsDir, outputFilename);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 90, effort: 6 }) // High quality, good compression
          .toFile(outputPath);
        console.log(`Converted ${file} -> ${outputFilename}`);
        // Optionally delete old files so they don't bloat the repo
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processImages();
