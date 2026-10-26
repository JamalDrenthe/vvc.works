import fs from "fs"
import path from "path"
import sharp from "sharp"

const SVG_SOURCE = path.resolve("public/vvc-logo.svg")

if (!fs.existsSync(SVG_SOURCE)) {
  console.error("Master logo not found at:", SVG_SOURCE)
  process.exit(1)
}

function createIco(pngBuffers) {
  const count = pngBuffers.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const dirEntries = []
  let offset = 6 + count * 16

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(img.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    offset += img.buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((b) => b.buffer)])
}

async function generatePack(targetDir, siteName, siteDescription) {
  console.log(`🎨 [LogoAnywhere] Generating brand pack for ${targetDir}...`)
  fs.mkdirSync(targetDir, { recursive: true })

  // Copy master svg
  fs.copyFileSync(SVG_SOURCE, path.join(targetDir, "vvc-logo.svg"))
  fs.copyFileSync(SVG_SOURCE, path.join(targetDir, "favicon.svg"))

  // 1. High-Res Master Render (2048x2048)
  const masterBuffer = await sharp(SVG_SOURCE, { density: 600 })
    .resize(2048, 2048)
    .png()
    .toBuffer()

  // 2. Android Chrome 512x512
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
    .toFile(path.join(targetDir, "android-chrome-512x512.png"))

  // 3. Android Chrome 192x192
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
    .toFile(path.join(targetDir, "android-chrome-192x192.png"))

  // 4. Apple Touch Icon (180x180)
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
    .toFile(path.join(targetDir, "apple-touch-icon.png"))

  // 5. Social Avatar (1000x1000)
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
    .toFile(path.join(targetDir, "social-avatar.png"))

  // 6. Open Graph Link Preview (1200x630)
  const escapedSiteName = siteName.replace(/&/g, "&amp;")
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
        .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; font-size: 50px; font-weight: 900; font-style: italic; letter-spacing: -0.04em; fill: #ffffff; text-anchor: middle; }
        .subtitle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 0.25em; fill: #e6007e; text-anchor: middle; text-transform: uppercase; }
        .badge-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.15em; fill: #888888; text-anchor: middle; }
      </style>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <line x1="200" y1="530" x2="1000" y2="530" stroke="#222222" stroke-width="1"/>
    <text x="600" y="440" class="title">VERDIENENDE VRIENDEN CLUB</text>
    <text x="600" y="490" class="subtitle">${escapedSiteName}</text>
    <text x="600" y="575" class="badge-text">vvc.works • verdienendevrienden.club</text>
  </svg>
  `
  const ogBgBuffer = await sharp(Buffer.from(ogSvg)).png().toBuffer()
  const ogLogoBadge = await sharp(masterBuffer)
    .resize(230, 230, { fit: "contain" })
    .toBuffer()

  await sharp(ogBgBuffer)
    .composite([{ input: ogLogoBadge, top: 125, left: 485 }])
    .png()
    .toFile(path.join(targetDir, "og-image.png"))

  // 7. Multi-size Favicon.ico
  const p16 = await sharp(masterBuffer).resize(16, 16).png().toBuffer()
  const p32 = await sharp(masterBuffer).resize(32, 32).png().toBuffer()
  const p48 = await sharp(masterBuffer).resize(48, 48).png().toBuffer()

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ])
  fs.writeFileSync(path.join(targetDir, "favicon.ico"), icoBuffer)

  // 8. Site Webmanifest
  const webmanifest = {
    name: "Verdienende Vrienden Club",
    short_name: "VVC",
    description: siteDescription,
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
    path.join(targetDir, "site.webmanifest"),
    JSON.stringify(webmanifest, null, 2),
    "utf8",
  )

  console.log(`✓ Completed brand pack for ${targetDir}`)
}

async function run() {
  // Target 1: pitchtool
  await generatePack(
    "/home/jsdrenthe/antigravity/pitchtool/public",
    "Pitch & Opportunity Tool",
    "Ontwerp je financiële vrijheid. VVC Pitch & Opportunity Tool.",
  )

  // Target 2: vvc-webapp
  await generatePack(
    "/home/jsdrenthe/antigravity/vvc-webapp/public",
    "Exclusief Platform & Ecosysteem",
    "Verdienende Vrienden Club (VVC) — Exclusief ecosysteem voor ondernemers en sales talent.",
  )

  console.log("🎉 All targets generated successfully!")
}

run().catch(console.error)
