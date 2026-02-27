import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Building2, Layers, Video, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import exteriorMd from "@/pages/services/ExteriorDesign.md?raw";
import interiorMd from "@/pages/services/InteriorDesign.md?raw";
import virtualToursMd from "@/pages/services/VirtualTours.md?raw";
import animationMd from "@/pages/services/Animation.md?raw";

const Services = () => {
  const { t } = useTranslation();

  const ext = useReadme({ localContent: exteriorMd, id: "exterior", isService: true });
  const int_ = useReadme({ localContent: interiorMd, id: "interior", isService: true });
  const vt = useReadme({ localContent: virtualToursMd, id: "virtual-tours", isService: true });
  const anim = useReadme({ localContent: animationMd, id: "animation", isService: true });

  const services = [
    {
      id: "exterior",
      title: ext.titleContent || "",
      description: ext.overviewContent || "",
      icon: Building2,
    },
    {
      id: "interior",
      title: int_.titleContent || "",
      description: int_.overviewContent || "",
      icon: Palette,
    },
    {
      id: "virtual-tours",
      title: vt.titleContent || "",
      description: vt.overviewContent || "",
      icon: Video,
    },
    {
      id: "animation",
      title: anim.titleContent || "",
      description: anim.overviewContent || "",
      icon: Layers,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="animate-fade-up inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {t("services.preview.tag")}
              </span>
              <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("services.preview.title")}
              </h1>
              <p className="animate-fade-up delay-200 text-lg text-muted-foreground">
                {t("services.page.hero_desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-card/80 backdrop-blur-md shadow-card">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col transition-all duration-300 bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Content Overlay Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 flex flex-col items-center text-center h-full z-10">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:scale-110">
                        <service.icon className="w-8 h-8" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-4 text-sm max-w-md">
                      {service.description}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-center border-t border-border/40 w-full">
                      <Button variant="hero" asChild className="rounded-xl px-10 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                        <Link to={`/services/${service.id}`}>
                          {t("services.page.cta_details")}
                          <ArrowRight className="w-5 h-5 rtl:mr-2 ltr:ml-2 rtl:rotate-180" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t("services.page.cta_title")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("services.page.cta_desc")}
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/218928198656" target="_blank" rel="noopener noreferrer">
                  {t("services.page.cta_whatsapp")}
                  <ArrowRight className="w-5 h-5 rtl:pl-1 rtl:rotate-180" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
