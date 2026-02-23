import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Star, Search } from "lucide-react";
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
      id: "engineer-system-lite",
      title: t("products.items.engineer_system_lite.title"),
      description: t("products.items.engineer_system_lite.desc"),
      longDescription: t("products.items.engineer_system_lite.long_desc"),
      badge: t("products.badges.new"),
      features: [
        t("products.items.engineer_system_lite.features.0"),
        t("products.items.engineer_system_lite.features.1"),
        t("products.items.engineer_system_lite.features.2"),
        t("products.items.engineer_system_lite.features.3"),
        t("products.items.engineer_system_lite.features.4"),
      ],
      link: "/products/engineer-system-lite",
    },
    {
      id: "file-encryption",
      title: t("products.items.file_encryption.title"),
      description: t("products.items.file_encryption.desc"),
      longDescription: t("products.items.file_encryption.long_desc"),
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
    <div className="min-h-screen">
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
        <section className="py-16 bg-card/80 backdrop-blur-md shadow-card min-h-[400px]">
          <div className="container mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/5 to-primary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 geometric-pattern opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500" />

                    {/* Card Header with Badge */}
                    <div className="relative z-20 py-4 px-8 bg-primary/5 border-b border-border/50 flex justify-center items-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-50" />
                      {product.badge ? (
                        <span className="relative z-10 flex items-center gap-2 text-primary text-sm font-bold">
                          <Star className="w-4 h-4 fill-primary/20" />
                          {product.badge}
                        </span>
                      ) : (
                        <span className="relative z-10 flex items-center gap-2 text-muted-foreground/60 text-sm font-bold italic">
                          {t("products.preview.tag")}
                        </span>
                      )}
                    </div>

                    <div className="relative p-8 flex flex-col h-full z-10 items-center text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed flex-1">
                        {product.longDescription}
                      </p>

                      <Button variant="outline" className="w-full mt-auto" asChild>
                        <Link to={product.link}>
                          {t("products.page.cta_details")}
                          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        </Link>
                      </Button>
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
