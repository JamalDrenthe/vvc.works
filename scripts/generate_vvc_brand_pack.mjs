import fs from "fs"
import path from "path"
import sharp from "sharp"

const PUBLIC_DIR = path.resolve("public")
const SVG_SOURCE = path.join(PUBLIC_DIR, "vvc-logo.svg")

if (!fs.existsSync(SVG_SOURCE)) {
  console.error("Master logo not found at:", SVG_SOURCE)
  process.exit(1)
}

function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 for icon
  header.writeUInt16LE(count, 4) // image count

  const dirEntries = []
  let offset = 6 + count * 16

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1)
    entry.writeUInt8(0, 2) // color count
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8) // size of image data
    entry.writeUInt32LE(offset, 12) // offset of image data
    dirEntries.push(entry)
    offset += img.buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((b) => b.buffer)])
}

async function run() {
  console.log("🎨 [LogoAnywhere] Generating VVC Digital Asset Pack...")

  // 1. High-Res Master Render (2048x2048)
  const masterBuffer = await sharp(SVG_SOURCE, { density: 600 })
    .resize(2048, 2048)
    .png()
    .toBuffer()

  // 2. Android Chrome 512x512 (PWA Maskable & High-Res)
  const logo512 = await sharp(masterBuffer)
    .resize(410, 410, { fit: "contain" })
    .toBuffer()

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 8, g: 8, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: logo512, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "android-chrome-512x512.png"))
  console.log("  ✓ android-chrome-512x512.png")

  // 3. Android Chrome 192x192 (PWA Regular)
  const logo192 = await sharp(masterBuffer)
    .resize(154, 154, { fit: "contain" })
    .toBuffer()

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 8, g: 8, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: logo192, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "android-chrome-192x192.png"))
  console.log("  ✓ android-chrome-192x192.png")

  // 4. Apple Touch Icon (180x180 - iOS Home Screen, no transparency)
  const logo180 = await sharp(masterBuffer)
    .resize(140, 140, { fit: "contain" })
    .toBuffer()

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 8, g: 8, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: logo180, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"))
  console.log("  ✓ apple-touch-icon.png")

  // 5. Social Avatar (1000x1000 - Circular Safe Zone 20% margin)
  const logoSocial = await sharp(masterBuffer)
    .resize(760, 760, { fit: "contain" })
    .toBuffer()

  await sharp({
    create: {
      width: 1000,
      height: 1000,
      channels: 4,
      background: { r: 6, g: 6, b: 8, alpha: 1 },
    },
  })
    .composite([{ input: logoSocial, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "social-avatar.png"))
  console.log("  ✓ social-avatar.png")

  // 6. Open Graph Link Preview (1200x630 - WhatsApp, LinkedIn, X, FB)
  // Background SVG with luxury dark theme, glow, and typography
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#050508"/>
        <stop offset="50%" stop-color="#0a0a10"/>
        <stop offset="100%" stop-color="#020204"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#e6007e" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="#e6007e" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="#e6007e" stop-opacity="0"/>
      </radialGradient>
      <style>
        .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; font-size: 52px; font-weight: 900; font-style: italic; letter-spacing: -0.04em; fill: #ffffff; text-anchor: middle; }
        .subtitle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 0.25em; fill: #e6007e; text-anchor: middle; text-transform: uppercase; }
        .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.15em; fill: #888888; text-anchor: middle; }
      </style>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <line x1="200" y1="530" x2="1000" y2="530" stroke="#222222" stroke-width="1"/>
    <text x="600" y="440" class="title">VERDIENENDE VRIENDEN CLUB</text>
    <text x="600" y="490" class="subtitle">Elite Platform &amp; Ecosysteem</text>
    <text x="600" y="575" class="badge-text">vvc.works • login.verdienendevrienden.club</text>
  </svg>
  `

  const ogBgBuffer = await sharp(Buffer.from(ogSvg)).png().toBuffer()
  const ogLogoBadge = await sharp(masterBuffer)
    .resize(230, 230, { fit: "contain" })
    .toBuffer()

  await sharp(ogBgBuffer)
    .composite([{ input: ogLogoBadge, top: 125, left: 485 }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "og-image.png"))
  console.log("  ✓ og-image.png (1200x630)")

  // 7. Multi-size Favicon.ico (16x16, 32x32, 48x48)
  const p16 = await sharp(masterBuffer).resize(16, 16).png().toBuffer()
  const p32 = await sharp(masterBuffer).resize(32, 32).png().toBuffer()
  const p48 = await sharp(masterBuffer).resize(48, 48).png().toBuffer()

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ])
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer)
  console.log("  ✓ favicon.ico (multi-size: 16, 32, 48)")

  // 8. Site Webmanifest (PWA)
  const webmanifest = {
    name: "Verdienende Vrienden Club",
    short_name: "VVC",
    description: "VVC Platform — Login, Onboarding & Ecosysteem voor de Verdienende Vrienden Club.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  }
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "site.webmanifest"),
    JSON.stringify(webmanifest, null, 2),
    "utf8",
  )
  console.log("  ✓ site.webmanifest")

  console.log("🎉 [LogoAnywhere] All brand assets successfully generated!")
}

run().catch(console.error)
