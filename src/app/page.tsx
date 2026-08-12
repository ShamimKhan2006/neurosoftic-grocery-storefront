import Hero from "@/components/Hero";
import ProductsPage from "./products/page";
import TopProductsToday from "@/components/TopProductsToday";


export default function Home() {
  return (
      <>
      <Hero/> 
     <ProductsPage></ProductsPage> 
     <TopProductsToday/>
      
      </>
  );
}
