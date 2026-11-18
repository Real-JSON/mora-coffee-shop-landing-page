import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Discover the thinking and craft behind MŌRA."
};

export default function StoryPage() {
  return (
    <>
      <section className="relative flex min-h-[560px] items-end bg-[#211710] pb-16 pt-36 text-[#f7efe4]">
        <Image src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=85" alt="Coffee being prepared by hand" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="section-shell relative z-10">
          <p className="eyebrow mb-5 text-[#d6a174]">THE THINKING BEHIND THE POUR</p>
          <h1 className="display-font text-[clamp(58px,10vw,120px)] leading-[.84]">A STORY<br />IN EVERY CUP.</h1>
        </div>
      </section>
      <section className="section-pad bg-[#f7efe4]">
        <div className="section-shell grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <div className="image-frame relative aspect-[4/5]">
            <Image src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85" alt="Coffee served in a warm, relaxed setting" fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
          </div>
          <div className="self-center">
            <p className="eyebrow mb-6 text-[#a16a42]">OUR POINT OF VIEW</p>
            <h2 className="display-font text-[clamp(44px,6vw,78px)] leading-[.92]">THE EVERYDAY<br />DESERVES A<br />LITTLE ART.</h2>
            <p className="mt-8 max-w-[510px] text-sm leading-8 text-[#796d60]">MŌRA is a concept built around the idea that coffee should feel personal. We love the familiar rhythm of a daily cup, but we also believe there is room for experimentation, expression and surprise.</p>
            <p className="mt-5 max-w-[510px] text-sm leading-8 text-[#796d60]">Our approach is simple: respect the craft, stay curious about flavour, and make every guest feel welcome. The result is a coffee house that feels considered without taking itself too seriously.</p>
            <Link href="/menu" className="button-primary mt-9">Explore the collection ↗</Link>
          </div>
        </div>
      </section>
    </>
  );
}
