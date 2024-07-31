import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import { globby } from "globby";
import jsdoc2md from "jsdoc-to-markdown";

const FILENAME = "API.md";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function render(pattern: string, output: string | Buffer | URL | number) {
  const files = await globby([
    pattern,
    "!**/**/node_modules",
    "!**/**/test",
    "!**/**/examples",
  ]);
  const md = await jsdoc2md.render({
    files,
    plugin: "dmd-readable",
  });
  writeFileSync(output, md);
}

async function build() {
  await render("src/**/*.ts", join(__dirname, "../docs", FILENAME));
}

build().catch(console.error);
