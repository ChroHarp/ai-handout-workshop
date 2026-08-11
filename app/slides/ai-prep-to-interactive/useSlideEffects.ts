"use client";

import { useLayoutEffect, useRef, type MutableRefObject } from "react";
import type { Slide } from "./types";

const fadeKeyframes: Keyframe[] = [
  { opacity: 0, transform: "translateY(18px)" },
  { opacity: 1, transform: "translateY(0)" },
];

function fadeIn(element: Element | null, delay = 0, duration = 560) {
  if (!element) return null;
  return element.animate(fadeKeyframes, {
    delay,
    duration,
    easing: "cubic-bezier(.2,.72,.25,1)",
    fill: "both",
  });
}

function typewrite(element: Element | null, startDelay = 0) {
  if (!(element instanceof HTMLElement)) return { cleanup: () => {}, duration: 0 };

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (current.textContent) textNodes.push(current as Text);
    current = walker.nextNode();
  }

  const originals = textNodes.map((node) => node.textContent || "");
  const totalCharacters = originals.reduce((sum, text) => sum + text.length, 0);
  const intervalMs = Math.max(8, Math.min(24, Math.floor(2800 / Math.max(totalCharacters, 1))));
  const duration = totalCharacters * intervalMs;

  element.setAttribute("aria-label", element.textContent || "");
  element.style.opacity = "0";
  textNodes.forEach((node) => {
    node.textContent = "";
  });

  let nodeIndex = 0;
  let characterIndex = 0;
  let intervalId = 0;
  const timeoutId = window.setTimeout(() => {
    element.style.opacity = "1";
    intervalId = window.setInterval(() => {
      while (nodeIndex < textNodes.length && characterIndex >= originals[nodeIndex].length) {
        nodeIndex += 1;
        characterIndex = 0;
      }

      if (nodeIndex >= textNodes.length) {
        window.clearInterval(intervalId);
        return;
      }

      textNodes[nodeIndex].textContent += originals[nodeIndex][characterIndex];
      characterIndex += 1;
    }, intervalMs);
  }, startDelay);

  return {
    duration: startDelay + duration,
    cleanup: () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      textNodes.forEach((node, index) => {
        node.textContent = originals[index];
      });
      element.style.opacity = "";
      element.removeAttribute("aria-label");
    },
  };
}

function matchMediaHeight(article: HTMLElement) {
  const markdown = article.querySelector<HTMLElement>('[data-role="slide-markdown"]');
  const media = article.querySelector<HTMLElement>('[data-role="slide-media"]');
  if (!markdown || !media) return () => {};

  const sync = () => {
    if (window.innerWidth < 900) {
      media.style.height = "";
      return;
    }
    const children = Array.from(markdown.children) as HTMLElement[];
    if (!children.length) return;
    const first = children[0].getBoundingClientRect();
    const last = children[children.length - 1].getBoundingClientRect();
    media.style.height = Math.ceil(last.bottom - first.top) + "px";
  };

  const frame = window.requestAnimationFrame(sync);
  window.addEventListener("resize", sync);
  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", sync);
    media.style.height = "";
  };
}

function elementsFrom(nodes: Iterable<Element | null | undefined>) {
  return Array.from(nodes).filter(
    (element): element is HTMLElement => element instanceof HTMLElement,
  );
}

export function useSlideEffects(
  slide: Slide | undefined,
  advanceEffectRef: MutableRefObject<() => boolean>,
) {
  const articleRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const article = articleRef.current;
    advanceEffectRef.current = () => false;
    if (!article || !slide?.effects) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const effects = new Set(slide.effects.split(/[\s,]+/).filter(Boolean));
    const animations: Animation[] = [];
    const cleanups: Array<() => void> = [];
    const hidden = new Set<HTMLElement>();
    const stages: Array<() => void> = [];
    const markdowns = Array.from(
      article.querySelectorAll<HTMLElement>('[data-role="slide-markdown"]'),
    );

    const addStage = (
      candidates: Iterable<Element | null | undefined>,
      typewriterElement?: Element | null,
    ) => {
      const elements = elementsFrom(candidates);
      if (!elements.length) return;

      elements.forEach((element) => {
        hidden.add(element);
        element.style.opacity = "0";
        element.style.visibility = "hidden";
        element.style.transform = "translateY(14px)";
      });

      stages.push(() => {
        elements.forEach((element, index) => {
          element.style.visibility = "visible";
          element.style.transform = "";

          if (element === typewriterElement) {
            const typed = typewrite(element);
            cleanups.push(typed.cleanup);
            return;
          }

          const animation = fadeIn(element, index * 90, 520);
          if (animation) animations.push(animation);
        });
      });
    };

    if (effects.has("cards-stagger")) {
      article.querySelectorAll("li").forEach((card, index) => {
        const animation = fadeIn(card, 120 + index * 170, 600);
        if (animation) animations.push(animation);
      });
    }

    if (effects.has("click-sections")) {
      const markdown = markdowns[0];
      if (markdown) {
        const included = new Set<HTMLElement>();
        markdown.querySelectorAll<HTMLElement>("h2").forEach((heading) => {
          const group = elementsFrom([heading, heading.nextElementSibling]);
          group.forEach((element) => included.add(element));
          addStage(group);
        });
        const closing = markdown.querySelector<HTMLElement>(":scope > p:last-child");
        if (closing && !included.has(closing)) addStage([closing]);
      }
    }

    if (effects.has("background-media")) {
      const background = fadeIn(
        article.querySelector('[data-role="slide-media"]'),
        0,
        500,
      );
      const panel = fadeIn(markdowns[0] || null, 1000, 520);
      if (background) animations.push(background);
      if (panel) animations.push(panel);
    }

    if (effects.has("image-heading-typewriter-copy")) {
      if (!effects.has("background-media")) {
        const image = fadeIn(
          article.querySelector('[data-role="slide-media"]'),
          80,
          650,
        );
        if (image) animations.push(image);
      }
      const content = markdowns[0];
      const heading = content?.querySelector("h2") || null;
      if (!effects.has("background-media")) addStage([heading]);
      const prompt = content?.querySelector("blockquote") || null;
      addStage([prompt], prompt);
      const segments = content
        ? Array.from(
            content.querySelectorAll<HTMLElement>(
              ":scope > p, :scope > ul > li, :scope > ol > li",
            ),
          )
        : [];
      segments.forEach((segment, index) => {
        const isAutomaticFirstCopy =
          effects.has("background-media") && !heading && index === 0;
        if (!isAutomaticFirstCopy) addStage([segment]);
      });
    }

    if (effects.has("typewriter")) {
      const prompt = article.querySelector("blockquote");
      addStage([prompt], prompt);
    }

    if (effects.has("points-then-typewriter")) {
      const left = markdowns[0];
      const right = markdowns[1];
      addStage([left?.querySelector("h2")]);
      left?.querySelectorAll("li").forEach((point) => addStage([point]));
      addStage([right?.querySelector("h2")]);
      const prompt = right?.querySelector("blockquote") || null;
      addStage([prompt], prompt);
    }

    if (effects.has("image-then-copy")) {
      if (!effects.has("background-media")) {
        const image = fadeIn(
          article.querySelector('[data-role="slide-media"]'),
          80,
          650,
        );
        if (image) animations.push(image);
      }
      const content = markdowns[0];
      const segments = content
        ? Array.from(
            content.querySelectorAll<HTMLElement>(
              ":scope > p, :scope > ul > li, :scope > ol > li",
            ),
          )
        : [];
      segments.forEach((segment, index) => {
        const isAutomaticFirstCopy =
          effects.has("background-media") && index === 0;
        if (!isAutomaticFirstCopy) addStage([segment]);
      });
    }

    if (effects.has("image-then-typewriter")) {
      const image = fadeIn(
        article.querySelector('[data-role="slide-media"]'),
        80,
        650,
      );
      if (image) animations.push(image);
      const prompt = article.querySelector("blockquote");
      addStage([prompt], prompt);
    }

    if (effects.has("media-match")) {
      cleanups.push(matchMediaHeight(article));
    }

    let revealed = 0;
    const revealNext = () => {
      const stage = stages[revealed];
      if (!stage) return false;
      stage();
      revealed += 1;
      return true;
    };

    advanceEffectRef.current = revealNext;
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("button, a, video, input, textarea, select")
      ) {
        return;
      }
      revealNext();
    };
    if (stages.length) article.addEventListener("click", onClick);

    return () => {
      advanceEffectRef.current = () => false;
      article.removeEventListener("click", onClick);
      animations.forEach((animation) => animation.cancel());
      cleanups.forEach((cleanup) => cleanup());
      hidden.forEach((element) => {
        element.style.opacity = "";
        element.style.visibility = "";
        element.style.transform = "";
      });
    };
  }, [advanceEffectRef, slide?.fileName, slide?.effects]);

  return articleRef;
}
