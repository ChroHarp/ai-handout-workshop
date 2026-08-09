"use client";

import { useState } from "react";
import styles from "./deck.module.css";

type Props = {
  sourceLabel: string;
  targetLabel: string;
  successMessage: string;
  resetLabel: string;
};

export default function NetlifyPractice({
  sourceLabel,
  targetLabel,
  successMessage,
  resetLabel,
}: Props) {
  const [selected, setSelected] = useState(false);
  const [complete, setComplete] = useState(false);

  const deploy = () => {
    setSelected(false);
    setComplete(true);
  };

  return (
    <div className={styles.practice} data-complete={complete || undefined}>
      <button
        type="button"
        className={styles.folder}
        data-selected={selected || undefined}
        draggable
        onClick={() => setSelected(true)}
        onDragStart={(event) => {
          event.dataTransfer.setData("text/plain", "site-folder");
          event.dataTransfer.effectAllowed = "move";
          setSelected(true);
        }}
      >
        <span aria-hidden="true">📁</span>
        <strong>{sourceLabel}</strong>
      </button>

      <span className={styles.transferArrow} aria-hidden="true">→</span>

      <button
        type="button"
        className={styles.dropZone}
        onClick={() => {
          if (selected) deploy();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
        }}
        onDrop={(event) => {
          event.preventDefault();
          deploy();
        }}
        aria-live="polite"
      >
        <span aria-hidden="true">{complete ? "✓" : "⇩"}</span>
        <strong>{complete ? successMessage : targetLabel}</strong>
      </button>

      {complete ? (
        <button
          type="button"
          className={styles.resetPractice}
          onClick={() => setComplete(false)}
        >
          {resetLabel}
        </button>
      ) : null}
    </div>
  );
}
