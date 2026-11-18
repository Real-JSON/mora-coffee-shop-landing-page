import type { Metadata } from "next";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "The Menu",
  description: "Explore the MŌRA signature coffee collection."
};

export default function MenuPage() {
  return (
    <>
      <section className="relative flex min-h-[470px] items-end bg-[#211710] pb-16 pt-36 text-[#f7efe4]">
        <Image src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1800&q=85" alt="Coffee being prepared" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="section-shell relative z-10">
          <p className="eyebrow mb-5 text-[#d6a174]">A LITTLE SOMETHING FOR EVERY MOOD</p>
          <h1 className="display-font text-[clamp(64px,11vw,130px)] leading-[.82]">THE MENU.</h1>
          <p className="mt-7 max-w-[420px] text-sm leading-7 text-white/70">A starting point for your next favourite. Our menu is a celebration of coffee, creativity and the little details.</p>
        </div>
      </section>
      <section className="section-pad bg-[#eee2d1]">
        <div className="section-shell">
          <div className="mb-12 max-w-[650px]">
            <p className="eyebrow mb-5 text-[#a16a42]">SIGNATURE DRINKS</p>
            <h2 className="display-font text-5xl leading-none sm:text-7xl">MADE TO BE<br />REMEMBERED.</h2>
          </div>
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <p className="mt-12 max-w-[680px] text-xs leading-6 text-[#796d60]">Menu items and prices in this concept project are illustrative placeholders. Replace them with confirmed business information before publishing.</p>
        </div>
      </section>
    </>
  );
}
