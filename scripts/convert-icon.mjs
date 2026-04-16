import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { unlinkSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, '../app');

async function convertIcon() {
  const input = join(appDir, 'icon.png');
  const output = join(appDir, 'icon.webp');
  
  try {
    await sharp(input).webp().toFile(output);
    console.log('Successfully converted app/icon.png to app/icon.webp');
    unlinkSync(input);
    console.log('Deleted original app/icon.png');
  } catch (err) {
    console.error('Failed to convert icon:', err);
  }
}

convertIcon();
