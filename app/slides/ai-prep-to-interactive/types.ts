export const layouts = [
  "cover",
  "text",
  "bullets",
  "two-columns",
  "image-left",
  "image-right",
  "cards",
  "table",
  "quote",
  "full-image",
  "netlify-practice",
] as const;

export type SlideLayout = (typeof layouts)[number];

export type Slide = {
  id: string;
  fileName: string;
  title: string;
  layout: SlideLayout;
  section?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  video?: string;
  videoCaption?: string;
  sourceLabel?: string;
  targetLabel?: string;
  successMessage?: string;
  resetLabel?: string;
  accent?: string;
  animation?: string;
  html: string;
  columns: string[];
};
