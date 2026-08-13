import Hero from "@/components/Hero";
import ProductsPage from "./products/page";
import TopProductsToday from "@/components/TopProductsToday";
import FeaturesSection from "@/components/FeaturesSection";

import PromoSection from "@/components/PromoSection";
export default function Home() {
  return (
      <>
      
      <Hero/> 
     <ProductsPage></ProductsPage>  
      <PromoSection />
     <TopProductsToday/> 
      <FeaturesSection />
      
      </>
  );
}
