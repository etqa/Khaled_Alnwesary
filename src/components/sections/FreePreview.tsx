import { Puzzle, BookOpen, CheckSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import khToolsMd from "@/pages/free/KHTools.md?raw";
import quranAppMd from "@/pages/free/QuranApp.md?raw";
import taskManagerMd from "@/pages/free/TaskManager.md?raw";

export const FreePreview = () => {
  const { t } = useTranslation();

  const kh = useReadme({ localContent: khToolsMd, id: "kh-tools" });
  const quran = useReadme({ localContent: quranAppMd, id: "quran-app" });
  const task = useReadme({ localContent: taskManagerMd, id: "task-manager" });

  const freeItems = [
    {
      title: kh.titleContent || "",
      description: kh.shortDesc || "",
      icon: Puzzle,
      link: "/free/kh-tools",
    },
    {
      title: quran.titleContent || "",
      description: quran.shortDesc || "",
      icon: BookOpen,
      link: "/free/quran-app",
    },
    {
      title: task.titleContent || "",
      description: task.shortDesc || "",
      icon: CheckSquare,
      link: "/free/task-manager",
    },
  ];

  return (
    <section className="py-20 bg-card/90 backdrop-blur-md shadow-card border-y border-border/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4">
            {t("free.preview.tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("free.preview.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("free.preview.subtitle")}
          </p>
        </div>

        {/* Free Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeItems.map((tool, index) => (
            <div
              key={index}
              className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col transition-all duration-300 bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-1 w-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />

              <div className="relative p-8 flex flex-col items-center text-center h-full z-10">
                {/* Icon Circle */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:-rotate-6">
                    <tool.icon className="w-7 h-7" />
                  </div>
                  {/* Subtle floating background icon */}
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 text-sm max-w-[250px]">
                  {tool.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-center border-t border-border/40 w-full">
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span className="text-sm">{t("common.more")}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                  <Link to={tool.link} className="absolute inset-0 z-20">
                    <span className="sr-only">View detailes</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild className="rounded-xl px-12 group">
            <Link to="/free">
              {t("free.preview.cta_all")}
              <ArrowRight className="w-4 h-4 ms-2 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
