type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, description, light = false }: Props) {
  return (
    <div className="max-w-[760px]">
      <p className={`eyebrow mb-5 ${light ? "text-[#d7a477]" : "section-kicker"}`}>{eyebrow}</p>
      <h2 className={`display-font text-balance text-[clamp(42px,6.4vw,82px)] leading-[.94] ${light ? "text-[#f7efe4]" : "text-[#211710]"}`}>{title}</h2>
      {description && <p className={`mt-6 max-w-[510px] text-[15px] leading-7 ${light ? "text-white/65" : "text-[#796d60]"}`}>{description}</p>}
    </div>
  );
}
