import React from "react";
import { LayoutProps } from "./types";
import { Footer, Header } from "@/shared/components/custom/index";

export function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <main className="bg-[#D9D9D9]">{props.children}</main>
      <Footer />
    </>
  );
}
