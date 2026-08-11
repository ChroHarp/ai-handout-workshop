"use client";

import { useLayoutEffect, useRef } from "react";
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

function setupClickSections(article: HTMLElement) {
  const markdown = article.querySelector<HTMLElement>('[data-role="slide-markdown"]');
  if (!markdown) return () => {};

  const headings = Array.from(markdown.querySelectorAll<HTMLElement>("h2"));
  const groups = headings.map((heading) =>
    [heading, heading.nextElementSibling].filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    ),
  );

  groups.flat().forEach((element) => {
    element.style.opacity = "0";
    element.style.visibility = "hidden";
    element.style.transform = "translateY(14px)";
  });

  let revealed = 0;
  const revealNext = () => {
    const group = groups[revealed];
    if (!group) return;
    group.forEach((element, index) => {
      element.style.visibility = "visible";
      element.animate(fadeKeyframes, {
        delay: index * 100,
        duration: 520,
        easing: "cubic-bezier(.2,.72,.25,1)",
        fill: "forwards",
      });
    });
    revealed += 1;
  };

  article.addEventListener("click", revealNext);
  return () => article.removeEventListener("click", revealNext);
}

export function useSlideEffects(slide: Slide | undefined) {
  const articleRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const article = articleRef.current;
    if (!article || !slide?.effects) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const effects = new Set(slide.effects.split(/[\s,]+/).filter(Boolean));
    const animations: Animation[] = [];
    const cleanups: Array<() => void> = [];
    const markdowns = Array.from(
      article.querySelectorAll<HTMLElement>('[data-role="slide-markdown"]'),
    );

    if (effects.has("cards-stagger")) {
      article.querySelectorAll("li").forEach((card, index) => {
        const animation = fadeIn(card, 120 + index * 170, 600);
        if (animation) animations.push(animation);
      });
    }

    if (effects.has("click-sections")) {
      cleanups.push(setupClickSections(article));
    }

    if (effects.has("image-heading-typewriter-copy")) {
      const image = fadeIn(article.querySelector('[data-role="slide-media"]'), 80, 650);
      const heading = fadeIn(markdowns[0]?.querySelector("h2") || null, 520, 520);
      if (image) animations.push(image);
      if (heading) animations.push(heading);
      const typed = typewrite(markdowns[0]?.querySelector("blockquote") || null, 900);
      cleanups.push(typed.cleanup);
      const copy = fadeIn(markdowns[0]?.querySelector("p:last-child") || null, typed.duration + 160, 520);
      if (copy) animations.push(copy);
    }

    if (effects.has("typewriter")) {
      const typed = typewrite(article.querySelector("blockquote"), 260);
      cleanups.push(typed.cleanup);
    }

    if (effects.has("points-then-typewriter")) {
      const left = markdowns[0];
      const right = markdowns[1];
      const leftHeading = fadeIn(left?.querySelector("h2") || null, 100, 480);
      if (leftHeading) animations.push(leftHeading);
      const points = left?.querySelectorAll("li") || [];
      points.forEach((point, index) => {
        const animation = fadeIn(point, 350 + index * 190, 520);
        if (animation) animations.push(animation);
      });
      const promptStart = 350 + points.length * 190 + 500;
      const rightHeading = fadeIn(right?.querySelector("h2") || null, promptStart - 300, 480);
      if (rightHeading) animations.push(rightHeading);
      const typed = typewrite(right?.querySelector("blockquote") || null, promptStart);
      cleanups.push(typed.cleanup);
    }

    if (effects.has("image-then-copy")) {
      const image = fadeIn(article.querySelector('[data-role="slide-media"]'), 80, 650);
      if (image) animations.push(image);
      const content = markdowns[0];
      const segments = content
        ? Array.from(content.querySelectorAll(":scope > p, :scope > ul > li"))
        : [];
      segments.forEach((segment, index) => {
        const animation = fadeIn(segment, 620 + index * 230, 520);
        if (animation) animations.push(animation);
      });
    }

    if (effects.has("image-then-typewriter")) {
      const image = fadeIn(article.querySelector('[data-role="slide-media"]'), 80, 650);
      if (image) animations.push(image);
      const typed = typewrite(article.querySelector("blockquote"), 760);
      cleanups.push(typed.cleanup);
    }

    if (effects.has("media-match")) {
      cleanups.push(matchMediaHeight(article));
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [slide?.fileName, slide?.effects]);

  return articleRef;
}