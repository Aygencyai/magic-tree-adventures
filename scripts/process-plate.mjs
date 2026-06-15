// Plate processor — turn an outpainted full-res plate into the engine's web assets.
// Produces, for each input:
//   public/scenes/processed/<name>.png        full-res archival PNG (style source of truth)
//   public/scenes/web/<name>.webp             2048w colour texture for the WebGL layer
//   public/scenes/web/<name>.depth.webp       smoothed greyscale depth proxy (parallax driver)
//
// The depth proxy is a smoothed greyscale of the colour plate (greyscale → blur → mild
// contrast) — a smooth displacement driver that avoids luminance-edge smear. Drop a real
// Depth-Anything V2 / MiDaS map at the same *.depth.webp path later for a free upgrade.
//
// Usage: node scripts/process-plate.mjs <in.png> <name>   (name without extension, e.g. chakra-root-16x9)

import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const [input, name] = process.argv.slice(2)
if (!input || !name) {
  console.error('Usage: node scripts/process-plate.mjs <in.png> <name-without-ext>')
  process.exit(1)
}

const processedPng = path.join(ROOT, 'public/scenes/processed', `${name}.png`)
const webWebp = path.join(ROOT, 'public/scenes/web', `${name}.webp`)
const depthWebp = path.join(ROOT, 'public/scenes/web', `${name}.depth.webp`)

// archival full-res PNG
await sharp(input).png().toFile(processedPng)

// 2048w colour texture
await sharp(input).resize({ width: 2048, withoutEnlargement: true }).webp({ quality: 82 }).toFile(webWebp)

// smoothed greyscale depth proxy
await sharp(input)
  .resize({ width: 1024, withoutEnlargement: true })
  .greyscale()
  .blur(8)
  .linear(1.2, -22) // mild contrast
  .webp({ quality: 80 })
  .toFile(depthWebp)

console.log(`processed ${name}: processed.png + web.webp + depth.webp`)
