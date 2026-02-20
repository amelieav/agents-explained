import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/components";
const EXTENSIONS = new Set([".css", ".tsx", ".ts"]);
const rawColorPattern = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/;

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      files.push(...walk(full));
      continue;
    }

    const ext = full.slice(full.lastIndexOf("."));
    if (EXTENSIONS.has(ext)) {
      files.push(full);
    }
  }

  return files;
}

const failures = [];

for (const file of walk(ROOT)) {
  const source = readFileSync(file, "utf8");
  if (rawColorPattern.test(source)) {
    failures.push(file);
  }
}

if (failures.length > 0) {
  console.error("Raw color literals found in component files:");
  failures.forEach((file) => console.error(` - ${file}`));
  process.exit(1);
}

console.log("Component color token check passed.");
