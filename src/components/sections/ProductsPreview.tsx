import { Shield, Wrench, ArrowRight, Star, Zap, Layout, Calculator } from "lucide-react";
import { ItemLogo } from "@/components/details/ItemLogo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import engineerSystemMd from "@/pages/products/EngineerSystem.md?raw";
import fileEncryptionMd from "@/pages/products/FileEncryption.md?raw";
import engineerSystemLiteMd from "@/pages/products/EngineerSystemLite.md?raw";

export const ProductsPreview = () => {
  const { t } = useTranslation();

  const es = useReadme({ localContent: engineerSystemMd, id: "engineer-system", isProduct: true });
  const fe = useReadme({ localContent: fileEncryptionMd, id: "file-encryption", isProduct: true });
  const esl = useReadme({ localContent: engineerSystemLiteMd, id: "engineer-system-lite", isProduct: true });

  const products = [
    {
      title: es.titleContent || "",
      description: es.shortDesc || es.overviewContent || es.longDesc || "",
      icon: Layout,
      link: "/products/engineer-system",
      badge: t("products.badges.popular"),
      badgeIcon: Star,
      type: "popular",
      imageName: "EngineerSystem"
    },
    {
      title: esl.titleContent || "",
      description: esl.shortDesc || esl.overviewContent || esl.longDesc || "",
      icon: Calculator,
      link: "/products/engineer-system-lite",
      badge: t("products.badges.new"),
      badgeIcon: Zap,
      type: "new",
      imageName: "EngineerSystemLite"
    },
    {
      title: fe.titleContent || "",
      description: fe.shortDesc || fe.overviewContent || fe.longDesc || "",
      icon: Shield,
      link: "/products/file-encryption",
      badge: t("products.badges.new"),
      badgeIcon: Zap,
      type: "new",
      imageName: "FileEncryption"
    },
  ];

  return (
    <section className="py-20 bg-card/40 backdrop-blur-sm shadow-sm border-b border-border/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Products Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm transition-all duration-300 bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Header with Badge row (Centered) */}
              <div className="relative z-10 py-3 px-6 bg-primary/5 border-b border-border/50 flex items-center justify-center gap-2">
                <product.badgeIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {product.badge}
                </span>
              </div>

              <div className="relative p-8 flex flex-col h-full z-10 items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-[1rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2 mb-4">
                    <ItemLogo
                      imageName={product.imageName}
                      fallbackIcon={product.icon}
                      className="w-full h-full object-contain"
                      iconClassName="w-8 h-8 text-primary"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 text-sm max-w-[280px]">
                  {product.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-center border-t border-border/40 w-full">
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span className="text-sm">{t("common.more")}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                  <Link to={product.link} className="absolute inset-0 z-20">
                    <span className="sr-only">View product details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild className="rounded-xl px-12 group">
            <Link to="/products">
              {t("products.preview.cta_all")}
              <ArrowRight className="w-4 h-4 ms-2 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
