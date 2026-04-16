import sharp from 'sharp';
import { glob } from 'glob';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { unlinkSync, copyFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

async function convertToMultiResWebp() {
  try {
    const images = await glob('**/*.{png,jpg,jpeg}', { cwd: publicDir });
    
    console.log(`Found ${images.length} images to process in ${publicDir}`);

    for (const image of images) {
      const inputPath = join(publicDir, image);
      const fileExt = extname(image);
      const baseName = basename(image, fileExt);
      const dirName = dirname(image);
      const fullDirName = join(publicDir, dirName);

      console.log(`\nProcessing: ${image}`);
      
      try {
        const metadata = await sharp(inputPath).metadata();
        const baseWidth = metadata.width;

        const scales = [1, 2, 3, 4];
        const generatedFiles = [];

        for (const scale of scales) {
          const suffix = `@${scale}x`;
          const outputName = `${baseName}${suffix}.webp`;
          const outputPath = join(fullDirName, outputName);

          console.log(`  Generating ${outputName} (Scale ${scale}x)...`);
          
          await sharp(inputPath)
            .resize({ width: baseWidth * scale })
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          generatedFiles.push(outputPath);
        }

        // Also create a default .webp file (fallback) which is a copy of @1x
        const defaultWebpPath = join(fullDirName, `${baseName}.webp`);
        copyFileSync(join(fullDirName, `${baseName}@1x.webp`), defaultWebpPath);
        console.log(`  Created default fallback: ${baseName}.webp`);

        // Delete the original file
        console.log(`  Deleting original: ${image}`);
        unlinkSync(inputPath);
        
      } catch (err) {
        console.error(`  Error processing ${image}:`, err);
      }
    }
    
    console.log('\nAll conversions and deletions completed.');
  } catch (err) {
    console.error('An error occurred during the process:', err);
  }
}

convertToMultiResWebp();
