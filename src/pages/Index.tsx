import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { FreePreview } from "@/components/sections/FreePreview";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesPreview />
        <ProductsPreview />
        <FreePreview />
        <CoursesPreview />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
