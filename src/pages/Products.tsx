import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Wrench, Shield, ArrowRight, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: "engineer-system",
      title: t("products.items.engineer_system.title"),
      description: t("products.items.engineer_system.desc"),
      longDescription: t("products.items.engineer_system.long_desc"),
      icon: Wrench,
      badge: t("products.badges.popular"),
      features: [
        t("products.items.engineer_system.features.0"),
        t("products.items.engineer_system.features.1"),
        t("products.items.engineer_system.features.2"),
        t("products.items.engineer_system.features.3"),
        t("products.items.engineer_system.features.4"),
      ],
      link: "/products/engineer-system",
    },
    {
      id: "file-encryption",
      title: t("products.items.file_encryption.title"),
      description: t("products.items.file_encryption.desc"),
      longDescription: t("products.items.file_encryption.long_desc"),
      icon: Shield,
      badge: t("products.badges.new"),
      features: [
        t("products.items.file_encryption.features.0"),
        t("products.items.file_encryption.features.1"),
        t("products.items.file_encryption.features.2"),
        t("products.items.file_encryption.features.3"),
        t("products.items.file_encryption.features.4"),
      ],
      link: "/products/file-encryption",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.longDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="animate-fade-up inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                {t("products.preview.tag")}
              </span>
              <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("products.preview.title")}
              </h1>
              <p className="animate-fade-up delay-200 text-lg text-muted-foreground mb-10">
                {t("products.page.hero_desc")}
              </p>

              {/* Search Bar */}
              <div className="animate-fade-up delay-300 relative max-w-xl mx-auto group">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder={t("common.search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 ps-12 pe-4 rounded-2xl bg-card border-border/50 focus:ring-primary/20 transition-all text-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 bg-muted/30 min-h-[400px]">
          <div className="container mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <div className="space-y-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-up relative p-8 md:p-12 rounded-3xl bg-card border border-border overflow-hidden hover-lift"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {product.badge && (
                      <span className="absolute top-6 end-6 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        {product.badge}
                      </span>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-2/3">
                        <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                          <product.icon className="w-10 h-10 text-accent" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                          {product.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                          {product.longDescription}
                        </p>
                        <Button variant="hero" size="lg" asChild>
                          <Link to={product.link}>
                            {t("products.page.cta_details")}
                            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                          </Link>
                        </Button>
                      </div>

                      <div className="lg:w-1/3">
                        <h4 className="font-bold text-foreground mb-4">{t("products.page.features_label")}</h4>
                        <ul className="space-y-3">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("common.no_results")}
                </h3>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
