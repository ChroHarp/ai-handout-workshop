import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const contentDirectory = path.join(root, "content");
const allowedLayouts = new Set(["cover","text","bullets","two-columns","image-left","image-right","cards","table","quote","prompt","folder-tree","full-image","netlify-practice","interactive-demo"]);

function frontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, "每張投影片都需要 YAML front matter");
  return Object.fromEntries(match[1].split(/\r?\n/).filter((line) => line.includes(":")).map((line) => {
    const separator = line.indexOf(":");
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^["']|["']$/g, "")];
  }));
}

test("簡報包含依序命名的 43 個 Markdown 檔案", async () => {
  const files = (await readdir(contentDirectory)).filter((name) => /^\d{2}-[a-z0-9-]+\.md$/.test(name)).sort();
  assert.equal(files.length, 43);
  assert.deepEqual(files.map((name) => name.slice(0, 2)), Array.from({ length: 43 }, (_, index) => String(index + 1).padStart(2, "0")));
});

test("每張投影片都有標題、合法版型與存在的圖片", async () => {
  const files = (await readdir(contentDirectory)).filter((name) => /^\d{2}-[a-z0-9-]+\.md$/.test(name));
  for (const file of files) {
    const source = await readFile(path.join(contentDirectory, file), "utf8");
    const attributes = frontMatter(source);
    assert.ok(attributes.title, `${file} 缺少 title`);
    assert.ok(allowedLayouts.has(attributes.layout), `${file} 的 layout 不支援`);
    if (attributes.image?.startsWith("/images/")) {
      await access(path.join(root, "public", attributes.image.replace(/^\//, "")));
    }
    if (attributes.video?.startsWith("/videos/")) {
      await access(path.join(root, "public", attributes.video.replace(/^\//, "")));
    }
  }
});

test("簡報元件不含實際投影片標題", async () => {
  const component = await readFile(path.join(root, "app/slides/ai-prep-to-interactive/SlideDeck.tsx"), "utf8");
  for (const title of ["AI 備課到互動教材","提出三個課程構想","確認教學內容與課程安排","把教材部署到 Netlify"]) {
    assert.equal(component.includes(title), false);
  }
});
