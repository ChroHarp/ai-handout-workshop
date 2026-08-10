import { layouts, type Slide, type SlideLayout } from "../types";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function parseScalar(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontMatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { attributes: {} as Record<string, string>, body: source };

  const attributes: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    attributes[line.slice(0, separator).trim()] = parseScalar(
      line.slice(separator + 1),
    );
  }

  return { attributes, body: source.slice(match[0].length) };
}

function inlineMarkdown(value: string) {
  let output = escapeHtml(value);
  output = output.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
  );
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(
    /<strong>([^<]+)<\/strong>\s*[—–-]\s*(.+)$/,
    '<strong>$1</strong><span class="card-copy">$2</span>',
  );
  output = output.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const tick = String.fromCharCode(96);
  output = output.replace(
    new RegExp(tick + "([^" + tick + "]+)" + tick, "g"),
    "<code>$1</code>",
  );
  return output;
}

function isTableDivider(line: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(
    line,
  );
}

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => inlineMarkdown(cell.trim()));
}

type ListItem = { text: string; level: number };
type MarkdownList = { ordered: boolean; items: ListItem[] };

function renderNestedList(items: ListItem[], start = 0, level = 0): [string, number] {
  let html = "<ul>";
  let index = start;

  while (index < items.length) {
    const item = items[index];
    if (item.level < level) break;

    if (item.level > level) {
      const [nested, nextIndex] = renderNestedList(items, index, item.level);
      html += nested;
      index = nextIndex;
      continue;
    }

    html += "<li>" + inlineMarkdown(item.text);
    index += 1;

    if (index < items.length && items[index].level > level) {
      const [nested, nextIndex] = renderNestedList(
        items,
        index,
        items[index].level,
      );
      html += nested;
      index = nextIndex;
    }

    html += "</li>";
  }

  return [html + "</ul>", index];
}

export function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/<!--[^]*?-->/g, "").split(/\r?\n/);
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: MarkdownList | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;

    if (list.ordered) {
      html.push(
        "<ol>" +
          list.items
            .map((item) => "<li>" + inlineMarkdown(item.text) + "</li>")
            .join("") +
          "</ol>",
      );
    } else {
      html.push(renderNestedList(list.items, 0, list.items[0]?.level ?? 0)[0]);
    }

    list = null;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      isTableDivider(lines[index + 1])
    ) {
      flushParagraph();
      flushList();
      const headers = tableCells(trimmed);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      index -= 1;
      html.push(
        '<div class="table-wrap"><table><thead><tr>' +
          headers.map((cell) => "<th>" + cell + "</th>").join("") +
          "</tr></thead><tbody>" +
          rows
            .map(
              (row) =>
                "<tr>" +
                row.map((cell) => "<td>" + cell + "</td>").join("") +
                "</tr>",
            )
            .join("") +
          "</tbody></table></div>",
      );
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(
        "<h" +
          level +
          ">" +
          inlineMarkdown(heading[2]) +
          "</h" +
          level +
          ">",
      );
      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      const parts = [quote[1]];
      while (index + 1 < lines.length && /^>\s?/.test(lines[index + 1].trim())) {
        index += 1;
        parts.push(lines[index].trim().replace(/^>\s?/, ""));
      }
      html.push("<blockquote>" + inlineMarkdown(parts.join(" ")) + "</blockquote>");
      continue;
    }

    const unordered = line.match(/^(\s*)[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) flushList();
      list ??= { ordered: isOrdered, items: [] };
      list.items.push({
        text: unordered ? unordered[2] : ordered![1],
        level: unordered
          ? Math.floor(unordered[1].replaceAll("\t", "  ").length / 2)
          : 0,
      });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return html.join("");
}

export function parseSlide(fileName: string, source: string): Slide {
  const { attributes, body } = parseFrontMatter(source);
  const layoutValue = attributes.layout || "text";
  const layout: SlideLayout = layouts.includes(layoutValue as SlideLayout)
    ? (layoutValue as SlideLayout)
    : "text";
  const columnBodies = body.split(/\r?\n<!--\s*column\s*-->\r?\n/i);

  return {
    id: fileName.slice(0, 2),
    fileName,
    title: attributes.title || "",
    layout,
    section: attributes.section,
    eyebrow: attributes.eyebrow,
    image: attributes.image,
    imageAlt: attributes.imageAlt,
    imageCaption: attributes.imageCaption,
    imageFit: attributes.imageFit === "contain" ? "contain" : "cover",
    imagePosition: attributes.imagePosition,
    imageAspect: attributes.imageAspect,
    qrImage: attributes.qrImage,
    qrAlt: attributes.qrAlt,
    qrLabel: attributes.qrLabel,
    qrLink: attributes.qrLink,
    video: attributes.video,
    videoCaption: attributes.videoCaption,
    sourceLabel: attributes.sourceLabel,
    targetLabel: attributes.targetLabel,
    successMessage: attributes.successMessage,
    resetLabel: attributes.resetLabel,
    accent: attributes.accent || "teal",
    animation: attributes.animation || "fade-up",
    html: renderMarkdown(body),
    columns: columnBodies.map(renderMarkdown),
  };
}