import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Puzzle, BookOpen, CheckSquare, ArrowRight, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Tools = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      id: "kh-tools",
      title: t("tools.items.kh_tools.title"),
      description: t("tools.items.kh_tools.desc"),
      longDescription: t("tools.items.kh_tools.long_desc"),
      icon: Puzzle,
      category: t("tools.categories.blender"),
      link: "/tools/kh-tools",
    },
    {
      id: "quran-app",
      title: t("tools.items.quran_app.title"),
      description: t("tools.items.quran_app.desc"),
      longDescription: t("tools.items.quran_app.long_desc"),
      icon: BookOpen,
      category: t("tools.categories.mobile_app"),
      link: "/tools/quran-app",
    },
    {
      id: "task-manager",
      title: t("tools.items.task_manager.title"),
      description: t("tools.items.task_manager.desc"),
      longDescription: t("tools.items.task_manager.long_desc"),
      icon: CheckSquare,
      category: t("tools.categories.mobile_app"),
      link: "/tools/task-manager",
    },
  ];

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.longDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="animate-fade-up inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {t("tools.preview.tag")}
              </span>
              <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("tools.page.hero_title")}
              </h1>
              <p className="animate-fade-up delay-200 text-lg text-muted-foreground mb-10">
                {t("tools.page.hero_desc")}
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

        {/* Tools Grid */}
        <section className="py-16 bg-muted/30 min-h-[400px]">
          <div className="container mx-auto px-4">
            {filteredTools.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-up group relative overflow-hidden p-8 rounded-2xl bg-card border border-border hover-lift flex flex-col h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute top-6 end-6 z-10">
                      <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-bold border border-green-500/20">
                        {t("common.free")}
                      </span>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <tool.icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                      {tool.longDescription}
                    </p>

                    <Button variant="outline" className="w-full mt-auto" asChild>
                      <Link to={tool.link}>
                        {t("products.page.cta_details")}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    </Button>
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

export default Tools;
