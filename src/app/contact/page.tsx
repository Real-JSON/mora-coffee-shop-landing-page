import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MŌRA coffee house."
};

export default function ContactPage() {
  return (
    <section className="min-h-[75vh] bg-[#eee2d1] pb-24 pt-40">
      <div className="section-shell grid gap-14 md:grid-cols-[1fr_.8fr]">
        <div>
          <p className="eyebrow mb-6 text-[#a16a42]">COME AS YOU ARE</p>
          <h1 className="display-font text-[clamp(64px,11vw,130px)] leading-[.82]">LET'S<br />MEET<br /><span className="text-[#b87849]">OVER</span><br />COFFEE.</h1>
          <p className="mt-8 max-w-[420px] text-sm leading-7 text-[#796d60]">Have a question, a collaboration idea or simply want to say hello? We'd love to hear from you.</p>
        </div>
        <div className="self-end border-t border-[#211710]/20 pt-8">
          <div className="mb-9">
            <p className="eyebrow mb-3 text-[#a16a42]">EMAIL</p>
            <a className="font-serif text-2xl underline decoration-[#b87849] underline-offset-8" href="mailto:hello@mora.example">hello@mora.example</a>
          </div>
          <div className="mb-9">
            <p className="eyebrow mb-3 text-[#a16a42]">FIND US</p>
            <p className="font-serif text-2xl">Kandy, Sri Lanka</p>
            <p className="mt-2 text-xs text-[#796d60]">Concept location — confirm the actual address before launch.</p>
          </div>
          <div className="mb-9">
            <p className="eyebrow mb-3 text-[#a16a42]">OPENING HOURS</p>
            <p className="text-sm leading-7 text-[#796d60]">Opening hours to be confirmed.</p>
          </div>
          <Link href="/menu" className="button-primary">Explore the menu ↗</Link>
        </div>
      </div>
    </section>
  );
}
