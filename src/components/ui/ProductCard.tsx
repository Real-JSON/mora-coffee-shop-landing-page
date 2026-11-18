import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href="/menu" className="block">
        <div className="image-frame relative aspect-[4/5]">
          <Image src={product.image} alt={`${product.name} signature coffee`} fill sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw" className="object-cover" />
          <span className="absolute left-4 top-4 bg-[#f7efe4] px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em]">{product.category}</span>
          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#f7efe4] text-lg transition-transform group-hover:rotate-45">↗</span>
        </div>
        <div className="flex items-start justify-between gap-3 pt-5">
          <div>
            <h3 className="display-font text-2xl tracking-tight">{product.name}</h3>
            <p className="mt-2 max-w-[270px] text-sm leading-6 text-[#796d60]">{product.description}</p>
          </div>
          <span className="whitespace-nowrap pt-1 text-xs font-semibold">{product.price}</span>
        </div>
        <p className="eyebrow mt-4 text-[8px] text-[#a16a42]">{product.note}</p>
      </Link>
    </article>
  );
}
