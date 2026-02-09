import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { GlobalBackground } from "./components/layout/GlobalBackground";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/utils/ScrollToTop";
import MobileNav from "./components/layout/MobileNav";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  const basename = window.location.hostname.includes("github.io") ? "/wep" : "";

  useEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <div className="relative isolate min-h-screen">
            <GlobalBackground />
            <ScrollToTop />
            <div className="pb-20 lg:pb-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/:id" element={<ToolDetail />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <MobileNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
