"use client";

import { useEffect, useRef, useState } from "react";
import type { Slide } from "./types";
import NetlifyPractice from "./NetlifyPractice";
import { useDeckNavigation } from "./useDeckNavigation";
import { useSlideEffects } from "./useSlideEffects";
import styles from "./deck.module.css";

function Markdown({ html }: { html: string }) {
  return (
    <div
      className={styles.markdown}
      data-role="slide-markdown"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SlideMedia({ slide }: { slide: Slide }) {
  if (slide.video) {
    return (
      <figure className={styles.figure} data-role="slide-media">
        <video src={slide.video} controls muted playsInline preload="metadata" />
        {slide.videoCaption ? <figcaption>{slide.videoCaption}</figcaption> : null}
      </figure>
    );
  }

  if (!slide.image) return null;

  return (
    <figure
      className={styles.figure}
      data-role="slide-media"
      style={
        slide.imageAspect
          ? {
              aspectRatio: slide.imageAspect,
              height: "auto",
              maxHeight: "100%",
              justifySelf: "center",
            }
          : undefined
      }
    >
      <img
        src={slide.image}
        alt={slide.imageAlt || ""}
        style={{
          objectFit: slide.imageFit || "cover",
          objectPosition: slide.imagePosition || "center",
        }}
      />
      {slide.imageCaption ? <figcaption>{slide.imageCaption}</figcaption> : null}
    </figure>
  );
}

function CoverQr({ slide }: { slide: Slide }) {
  const [expanded, setExpanded] = useState(false);

  if (!slide.qrImage) return null;

  return (
    <button
      type="button"
      className={[
        styles.coverQr,
        expanded ? styles.coverQrExpanded : null,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => setExpanded((current) => !current)}
      aria-label={slide.qrAlt || slide.qrLabel || ""}
      aria-expanded={expanded}
    >
      <figure>
        <img src={slide.qrImage} alt={slide.qrAlt || ""} />
        {slide.qrLabel ? <figcaption>{slide.qrLabel}</figcaption> : null}
      </figure>
    </button>
  );
}

function SlideContent({ slide }: { slide: Slide }) {
  const media = <SlideMedia slide={slide} />;

  if (slide.layout === "cover" || slide.layout === "full-image") {
    return (
      <>
        {media}
        <CoverQr slide={slide} />
        <div className={styles.overlay}>
          {slide.eyebrow ? <p className={styles.eyebrow}>{slide.eyebrow}</p> : null}
          <h1>{slide.title}</h1>
          <Markdown html={slide.html} />
        </div>
      </>
    );
  }

  if (slide.layout === "image-left" || slide.layout === "image-right") {
    return (
      <div className={styles.mediaLayout} data-role="media-layout">
        {slide.layout === "image-left" ? media : null}
        <Markdown html={slide.html} />
        {slide.layout === "image-right" ? media : null}
      </div>
    );
  }

  if (slide.layout === "two-columns") {
    return (
      <div className={styles.columns}>
        {slide.columns.map((column, columnIndex) => (
          <Markdown key={columnIndex} html={column} />
        ))}
      </div>
    );
  }

  if (slide.layout === "interactive-demo") {
    return (
      <div className={styles.interactiveDemo}>
        <iframe
          src={slide.embedUrl}
          title={slide.embedTitle || slide.title}
          loading="eager"
          allow="fullscreen"
        />
        {slide.externalUrl ? (
          <a
            className={styles.interactiveDemoLink}
            href={slide.externalUrl}
            target="_blank"
            rel="noreferrer"
          >
            {slide.externalLabel || "另開互動頁面"}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <Markdown html={slide.html} />
      </div>
    );
  }

  if (slide.layout === "netlify-practice") {
    return (
      <div className={styles.practiceLayout}>
        <Markdown html={slide.html} />
        <NetlifyPractice
          sourceLabel={slide.sourceLabel || ""}
          targetLabel={slide.targetLabel || ""}
          successMessage={slide.successMessage || ""}
          resetLabel={slide.resetLabel || ""}
        />
      </div>
    );
  }

  return <Markdown html={slide.html} />;
}

export default function SlideDeck({ slides }: { slides: Slide[] }) {
  const advanceEffectRef = useRef<() => boolean>(() => false);
  const { index, next, previous, touchHandlers } = useDeckNavigation(
    slides.length,
    advanceEffectRef,
  );
  const slide = slides[index];
  const articleRef = useSlideEffects(slide, advanceEffectRef);
  useEffect(() => {
    const sources = new Set(
      slides.slice(index + 1, index + 3).flatMap((upcomingSlide) =>
        [upcomingSlide.image, upcomingSlide.qrImage].filter(
          (source): source is string => Boolean(source),
        ),
      ),
    );

    for (const source of sources) {
      const image = new window.Image();
      image.decoding = "async";
      image.src = source;
    }
  }, [index, slides]);

  if (!slide) return null;

  return (
    <main
      className={styles.stage}
      data-layout={slide.layout}
      data-accent={slide.accent}
      {...touchHandlers}
    >
      <article
        ref={articleRef}
        key={slide.fileName}
        data-effects={slide.effects}
        className={[
          styles.slide,
          styles[`layout${slide.layout
            .split("-")
            .map((part) => part[0].toUpperCase() + part.slice(1))
            .join("")}`],
          slide.contentSize === "large" ? styles.contentLarge : null,
          styles[slide.animation || "fade-up"],
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="slide-title"
      >
        {slide.layout !== "cover" && slide.layout !== "full-image" ? (
          <header className={styles.header}>
            <div>
              {slide.section ? <p className={styles.section}>{slide.section}</p> : null}
              <h1 id="slide-title">{slide.title}</h1>
            </div>
            <span className={styles.number}>{slide.id}</span>
          </header>
        ) : null}
        <div className={styles.body}>
          <SlideContent slide={slide} />
        </div>
      </article>

      <nav className={styles.controls}>
        <button onClick={previous} disabled={index === 0} aria-label="上一張投影片">
          ←
        </button>
        <button onClick={next} disabled={index === slides.length - 1} aria-label="下一張投影片">
          →
        </button>
        <button
          onClick={() => document.documentElement.requestFullscreen?.()}
          aria-label="進入全螢幕"
        >
          ⛶
        </button>
      </nav>

      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
      </div>
      <p className={styles.counter} aria-live="polite">
        {index + 1} / {slides.length}
      </p>
    </main>
  );
}
