import { Shield, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProductsPreview = () => {
  const { t } = useTranslation();

  const products = [
    {
      title: t("products.items.engineer_system.title"),
      description: t("products.items.engineer_system.desc"),
      icon: Wrench,
      link: "/products/engineer-system",
      badge: t("products.badges.popular"),
    },
    {
      title: t("products.items.file_encryption.title"),
      description: t("products.items.file_encryption.desc"),
      icon: Shield,
      link: "/products/file-encryption",
      badge: t("products.badges.new"),
    },
  ];

  return (
    <section className="py-20 bg-card/40 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            {t("products.preview.tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("products.preview.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("products.preview.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <Link
              key={index}
              to={product.link}
              className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover-lift overflow-hidden"
            >
              {product.badge && (
                <span className="absolute top-4 end-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {product.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {product.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                <span>{t("common.more")}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/products">
              {t("products.preview.cta_all")}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
