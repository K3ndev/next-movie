import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="border bottom-1 border-b-neutral-400 mb-10">
      <nav className="mx-auto w-full max-w-5xl md:max-w-6xl px-5 py-5 md:py-7 font-mono text-sm">
        <ul className="flex justify-between items-center">
          <li>
            <h1 className="text-md md:text-lg font-bold">NEXTRECIPES</h1>
          </li>
          <li>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
