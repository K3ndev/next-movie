import React from "react";
import { GenericPanelProps } from "./types";

export function GenericPanel(props: GenericPanelProps) {
  return (
    <section
      className={`mx-auto w-full max-w-5xl md:max-w-6xl px-5 py-5 md:py-7 ${props.className}`}
    >
      {props.children}
    </section>
  );
}
