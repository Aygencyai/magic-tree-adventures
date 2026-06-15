// Offset-crop tool — sharp-based arbitrary region extraction.
// sips only does centred crops; this supports left/top offset crops needed to
// isolate a single illustration from the book's 2-page spreads.
//
// Usage:
//   node scripts/crop.mjs <input> <output> <left> <top> <width> <height>
//   node scripts/crop.mjs <input> <output> --half left|right     (split a spread)
//   node scripts/crop.mjs <input> <output> --frac <l%> <t%> <w%> <h%>   (percentage region)
//
// Coordinates may be absolute pixels or, with --frac, fractions (0-1 or 0-100) of the source.
// Output format inferred from extension (.png/.webp). PNG by default.

import sharp from 'sharp'
import path from 'node:path'

const args = process.argv.slice(2)
if (args.length < 3) {
  console.error('Usage: node scripts/crop.mjs <input> <output> <left> <top> <width> <height>')
  console.error('   or: node scripts/crop.mjs <input> <output> --half left|right')
  console.error('   or: node scripts/crop.mjs <input> <output> --frac <l> <t> <w> <h>  (0-1 or 0-100)')
  process.exit(1)
}

const [input, output, ...rest] = args

const img = sharp(input)
const meta = await img.metadata()
const W = meta.width
const H = meta.height

function asFrac(v) {
  const n = Number(v)
  return n > 1 ? n / 100 : n
}

let region
if (rest[0] === '--half') {
  const side = rest[1] === 'right' ? 'right' : 'left'
  const halfW = Math.floor(W / 2)
  region = { left: side === 'right' ? W - halfW : 0, top: 0, width: halfW, height: H }
} else if (rest[0] === '--frac') {
  const [l, t, w, h] = rest.slice(1, 5).map(asFrac)
  region = {
    left: Math.round(l * W),
    top: Math.round(t * H),
    width: Math.round(w * W),
    height: Math.round(h * H),
  }
} else {
  const [l, t, w, h] = rest.slice(0, 4).map(Number)
  region = { left: l, top: t, width: w, height: h }
}

// Clamp to bounds
region.width = Math.min(region.width, W - region.left)
region.height = Math.min(region.height, H - region.top)

const ext = path.extname(output).toLowerCase()
let pipeline = sharp(input).extract(region)
if (ext === '.webp') pipeline = pipeline.webp({ quality: 92 })
else pipeline = pipeline.png()

await pipeline.toFile(output)
console.log(
  `cropped ${path.basename(input)} (${W}x${H}) → ${path.basename(output)} ` +
    `[${region.left},${region.top} ${region.width}x${region.height}]`
)
