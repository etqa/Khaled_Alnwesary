import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Star, Search, Shield, Layout, Calculator } from "lucide-react";
import { ItemLogo } from "@/components/details/ItemLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import engineerSystemMd from "@/pages/products/EngineerSystem.md?raw";
import engineerSystemLiteMd from "@/pages/products/EngineerSystemLite.md?raw";
import fileEncryptionMd from "@/pages/products/FileEncryption.md?raw";

const Products = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const es = useReadme({ localContent: engineerSystemMd, id: "engineer-system", isProduct: true });
  const esLite = useReadme({ localContent: engineerSystemLiteMd, id: "engineer-system-lite", isProduct: true });
  const fe = useReadme({ localContent: fileEncryptionMd, id: "file-encryption", isProduct: true });

  const products = [
    {
      id: "engineer-system",
      title: es.titleContent || "",
      description: es.shortDesc || es.overviewContent || es.longDesc || "",
      longDescription: es.longDesc || "",
      badge: t("products.badges.popular"),
      link: "/products/engineer-system",
      icon: Layout,
      imageName: "EngineerSystem"
    },
    {
      id: "engineer-system-lite",
      title: esLite.titleContent || "",
      description: esLite.shortDesc || esLite.overviewContent || esLite.longDesc || "",
      longDescription: esLite.longDesc || "",
      badge: t("products.badges.new"),
      link: "/products/engineer-system-lite",
      icon: Calculator,
      imageName: "EngineerSystemLite"
    },
    {
      id: "file-encryption",
      title: fe.titleContent || "",
      description: fe.shortDesc || fe.overviewContent || fe.longDesc || "",
      longDescription: fe.longDesc || "",
      badge: t("products.badges.new"),
      link: "/products/file-encryption",
      icon: Shield,
      imageName: "FileEncryption"
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
                  className="h-14 px-12 rounded-2xl bg-card border-border/50 focus:ring-primary/20 transition-all text-lg shadow-sm text-center"
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
                      <div className="mb-4">
                        <div className="w-16 h-16 rounded-[1rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2">
                          <ItemLogo
                            imageName={product.imageName}
                            fallbackIcon={product.icon}
                            className="w-full h-full object-contain"
                            iconClassName="w-8 h-8 text-primary"
                          />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed flex-1">
                        {product.description}
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
