import { parseSlide } from "./markdown";

const markdownModules = import.meta.glob("../../../../content/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

export async function loadSlides() {
  return Object.entries(markdownModules)
    .map(([filePath, source]) => {
      const fileName = filePath.split("/").at(-1) ?? filePath;
      return parseSlide(fileName, source);
    })
    .filter((slide) => /^\d{2}-[a-z0-9-]+\.md$/.test(slide.fileName))
    .sort((a, b) => a.fileName.localeCompare(b.fileName, "en"));
}
