import { Building2, ArrowRight, Layers, Palette, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import exteriorMd from "@/pages/services/ExteriorDesign.md?raw";
import interiorMd from "@/pages/services/InteriorDesign.md?raw";
import virtualToursMd from "@/pages/services/VirtualTours.md?raw";
import animationMd from "@/pages/services/Animation.md?raw";

export const ServicesPreview = () => {
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
      link: "/services/exterior",
    },
    {
      id: "interior",
      title: int_.titleContent || "",
      description: int_.overviewContent || "",
      icon: Palette,
      link: "/services/interior",
    },
    {
      id: "virtual-tours",
      title: vt.titleContent || "",
      description: vt.overviewContent || "",
      icon: Video,
      link: "/services/virtual-tours",
    }
  ];

  return (
    <section className="py-20 bg-card/90 backdrop-blur-md shadow-card border-b border-border/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("services.preview.tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("services.preview.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("services.preview.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col transition-all duration-300 bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Content Overlay Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 flex flex-col items-center text-center h-full z-10">
                {/* Icon Circle */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:rotate-6">
                    <service.icon className="w-7 h-7" />
                  </div>
                  {/* Subtle floating background icon */}
                  <service.icon className="absolute -top-4 -right-4 w-20 h-20 text-primary/5 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 text-sm max-w-[250px]">
                  {service.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-center border-t border-border/40 w-full">
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span className="text-sm">{t("services.page.cta_details")}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                  <Link to={service.link} className="absolute inset-0 z-20">
                    <span className="sr-only">View service details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild className="rounded-xl px-12 group transition-all hover:bg-primary hover:text-primary-foreground">
            <Link to="/services">
              {t("services.preview.cta_all")}
              <Layers className="w-4 h-4 ms-2 group-hover:scale-110 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
