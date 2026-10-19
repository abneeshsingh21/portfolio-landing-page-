import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const svgPath = path.join(rootDir, 'public', 'favicon.svg');
const iconsDir = path.join(rootDir, 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  const svgBuffer = fs.readFileSync(svgPath);

  console.log('Rendering PWA icons from liquid glass SVG...');

  // 1. icon-192.png (192x192)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192.png'));
  console.log('✓ public/icons/icon-192.png (192x192)');

  // 2. icon-512.png (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512.png'));
  console.log('✓ public/icons/icon-512.png (512x512)');

  // 3. icon-maskable.png (512x512) with safe-zone padding on #050508 background
  // Maskable icons require ~20% safe zone padding around key elements so circular/hexagonal launchers don't clip the edges
  const innerSize = Math.round(512 * 0.78); // ~400px
  const innerBuffer = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 5, g: 5, b: 8, alpha: 1 } // #050508 theme background
    }
  })
    .composite([
      {
        input: innerBuffer,
        gravity: 'centre'
      }
    ])
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable.png'));
  console.log('✓ public/icons/icon-maskable.png (512x512 maskable with safe margin)');

  // 4. apple-touch-icon.png (180x180) for iOS Safari home screen
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  console.log('✓ public/icons/apple-touch-icon.png (180x180)');

  // 5. Also copy to root public for default iOS fallback path /apple-touch-icon.png
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(rootDir, 'public', 'apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png (180x180)');

  // 6. Desktop legacy browser favicons (32x32, 16x16)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(rootDir, 'public', 'favicon-32x32.png'));
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(rootDir, 'public', 'favicon-16x16.png'));
  console.log('✓ public/favicon-32x32.png & 16x16.png');

  console.log('\nAll PWA app icons successfully generated!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
