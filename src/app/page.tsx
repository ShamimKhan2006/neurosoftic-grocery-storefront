import Hero from "@/components/Hero";
import ProductsPage from "./products/page";
import TopProductsToday from "@/components/TopProductsToday";
import FeaturesSection from "@/components/FeaturesSection";
import PromoSection from "@/components/PromoSection";
import FadeInSection from "@/components/FadeInSection";

export default function Home() {
  return (
    <>
      <Hero />

      <FadeInSection>
        <ProductsPage />
      </FadeInSection>

      <FadeInSection delay={100}>
        <PromoSection />
      </FadeInSection>

      <FadeInSection delay={200}>
        <TopProductsToday />
      </FadeInSection>

      <FadeInSection delay={300}>
        <FeaturesSection />
      </FadeInSection>
    </>
  );
}
