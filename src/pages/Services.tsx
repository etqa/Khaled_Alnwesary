import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Building2, Layers, Video, Palette, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: "exterior",
      title: t("services.items.exterior.title"),
      description: t("services.items.exterior.desc"),
      icon: Building2,
      features: [
        t("services.items.exterior.features.0"),
        t("services.items.exterior.features.1"),
        t("services.items.exterior.features.2"),
        t("services.items.exterior.features.3"),
      ],
    },
    {
      id: "interior",
      title: t("services.items.interior.title"),
      description: t("services.items.interior.desc"),
      icon: Palette,
      features: [
        t("services.items.interior.features.0"),
        t("services.items.interior.features.1"),
        t("services.items.interior.features.2"),
        t("services.items.interior.features.3"),
      ],
    },
    {
      id: "virtual-tours",
      title: t("services.items.virtual_tours.title"),
      description: t("services.items.virtual_tours.desc"),
      icon: Video,
      features: [
        t("services.items.virtual_tours.features.0"),
        t("services.items.virtual_tours.features.1"),
        t("services.items.virtual_tours.features.2"),
        t("services.items.virtual_tours.features.3"),
      ],
    },
    {
      id: "animation",
      title: t("services.items.animation.title"),
      description: t("services.items.animation.desc"),
      icon: Layers,
      features: [
        t("services.items.animation.features.0"),
        t("services.items.animation.features.1"),
        t("services.items.animation.features.2"),
        t("services.items.animation.features.3"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-fade-up p-8 rounded-2xl bg-card border border-border hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-foreground">
                            <Check className="w-5 h-5 text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
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
