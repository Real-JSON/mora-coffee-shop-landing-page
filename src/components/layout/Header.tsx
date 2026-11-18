"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#collection", label: "THE MENU" },
  { href: "/our-story", label: "OUR STORY" },
  { href: "/#experience", label: "THE EXPERIENCE" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="mx-auto flex h-[82px] w-[min(100%-36px,1320px)] items-center justify-between border-b border-white/20">
        <Link href="/" aria-label="MŌRA home" className="display-font text-[27px] tracking-[.12em]">
          MŌRA<span className="ml-2 align-top font-sans text-[8px] tracking-[.2em]">®</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="eyebrow text-[9px] text-white/85 transition-colors hover:text-[#e1b58e]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="button-primary !min-h-[40px] !px-5">Find your MŌRA <span aria-hidden>↗</span></Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="border-b border-white/15 bg-[#211710] px-[18px] py-7 md:hidden">
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="eyebrow text-xs text-white">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="button-primary w-fit">Find your MŌRA ↗</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
