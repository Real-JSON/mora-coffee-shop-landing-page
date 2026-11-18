import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import SignatureCollection from "@/components/sections/SignatureCollection";
import Experience from "@/components/sections/Experience";
import StoryPreview from "@/components/sections/StoryPreview";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <SignatureCollection />
      <Experience />
      <StoryPreview />
      <Testimonials />
    </>
  );
}
