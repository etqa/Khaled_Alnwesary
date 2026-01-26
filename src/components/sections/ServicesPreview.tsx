import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ServicesPreview = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.items.exterior.title"),
      description: t("services.items.exterior.desc"),
    },
    {
      title: t("services.items.interior.title"),
      description: t("services.items.interior.desc"),
    },
    {
      title: t("services.items.virtual_tours.title"),
      description: t("services.items.virtual_tours.desc"),
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover-lift cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              {t("services.preview.cta_all")}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
