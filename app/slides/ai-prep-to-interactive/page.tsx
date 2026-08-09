import SlideDeck from "./SlideDeck";
import { loadSlides } from "./lib/loadSlides";

export const dynamic = "force-static";

export default async function AiPrepToInteractiveSlides() {
  const slides = await loadSlides();
  return <SlideDeck slides={slides} />;
}

