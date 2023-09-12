import React from "react";
import { GenericPanelProps } from "./types";

export function GenericPanel({ children, className = "" }: GenericPanelProps) {
  return (
    <section
      className={`mx-auto max-w-7xl w-full ${className}`}
    >
      {children}
    </section>
  );
}
