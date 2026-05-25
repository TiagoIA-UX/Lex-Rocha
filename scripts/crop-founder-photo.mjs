import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const founderDir = path.join(root, "public", "images", "founder");

const sources = [
  {
    input: path.join(founderDir, "source-linkedin.png"),
    output: path.join(founderDir, "tiago-rocha.jpg"),
    // Remove monitor Zairyx (esquerda) e placa na mesa (baixo)
    crop: { left: 0.34, top: 0.04, width: 0.55, height: 0.82 },
    size: 800,
  },
  {
    input: path.join(founderDir, "source-whatsapp.png"),
    output: path.join(founderDir, "tiago-rocha-hero.jpg"),
    crop: { left: 0.3, top: 0.06, width: 0.4, height: 0.8 },
    size: 1400,
  },
];

async function cropImage({ input, output, crop, size }) {
  const meta = await sharp(input).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  const left = Math.round(w * crop.left);
  const top = Math.round(h * crop.top);
  const width = Math.min(Math.round(w * crop.width), w - left);
  const height = Math.min(Math.round(h * crop.height), h - top);

  await sharp(input)
    .extract({ left, top, width, height })
    .resize(size, Math.round(size * 1.15), {
      fit: "cover",
      position: "top",
    })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);

  console.log(`OK: ${path.basename(output)}`);
}

for (const src of sources) {
  await cropImage(src);
}
