import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parseSlide } from "./markdown";

export async function loadSlides() {
  const contentDirectory = path.join(process.cwd(), "content");
  const fileNames = (await readdir(contentDirectory))
    .filter((fileName) => /^\d{2}-[a-z0-9-]+\.md$/.test(fileName))
    .sort((a, b) => a.localeCompare(b, "en"));

  return Promise.all(
    fileNames.map(async (fileName) =>
      parseSlide(
        fileName,
        await readFile(path.join(contentDirectory, fileName), "utf8"),
      ),
    ),
  );
}