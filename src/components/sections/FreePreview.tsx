import { Puzzle, BookOpen, CheckSquare, ArrowRight, Sparkles, Gift, Crown, Clock } from "lucide-react";
import { ItemLogo } from "@/components/details/ItemLogo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import khToolsMd from "@/pages/free/kh-tools/content.md?raw";
import quranAppMd from "@/pages/free/quran-app/content.md?raw";
import taskManagerMd from "@/pages/free/task-manager/content.md?raw";

export const FreePreview = () => {
  const { t } = useTranslation();

  const kh = useReadme({ localContent: khToolsMd, id: "kh-tools" });
  const quran = useReadme({ localContent: quranAppMd, id: "quran-app" });
  const task = useReadme({ localContent: taskManagerMd, id: "task-manager" });

  const freeItems = [
    {
      title: kh.titleContent || "",
      description: kh.shortDesc || kh.overviewContent || kh.longDesc || "",
      icon: Puzzle,
      link: "/free/kh-tools",
      isPaid: kh.isPaid,
      isComingSoon: kh.isComingSoon,
      typeLabel: kh.typeLabel,
      imageName: "KHTools"
    },
    {
      title: quran.titleContent || "",
      description: quran.shortDesc || quran.overviewContent || quran.longDesc || "",
      icon: BookOpen,
      link: "/free/quran-app",
      isPaid: quran.isPaid,
      isComingSoon: quran.isComingSoon,
      typeLabel: quran.typeLabel,
      imageName: "QuranApp"
    },
    {
      title: task.titleContent || "",
      description: task.shortDesc || task.overviewContent || task.longDesc || "",
      icon: CheckSquare,
      link: "/free/task-manager",
      isPaid: task.isPaid,
      isComingSoon: task.isComingSoon,
      typeLabel: task.typeLabel,
      imageName: "TaskManager"
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
        <div className="flex flex-wrap justify-center gap-8">
          {freeItems.map((tool, index) => (
            <div
              key={index}
              className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm transition-all duration-300 bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-1 w-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />

              {/* Card Header with Badge row (Centered) */}
              <div className={`relative z-10 py-3 px-6 border-b border-border/50 flex items-center justify-center gap-2 ${tool.isComingSoon ? 'bg-amber-500/5' : (tool.isPaid ? 'bg-primary/5' : 'bg-green-500/5')
                }`}>
                {tool.isComingSoon ? (
                  <>
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      {tool.typeLabel}
                    </span>
                  </>
                ) : (
                  <>
                    {tool.isPaid ? <Crown className="w-4 h-4 text-primary" /> : <Gift className="w-4 h-4 text-green-600" />}
                    <span className={`text-xs font-bold uppercase tracking-wider ${tool.isPaid ? 'text-primary' : 'text-green-600'}`}>
                      {tool.typeLabel || (tool.isPaid ? t("common.paid") : t("common.free"))}
                    </span>
                  </>
                )}
              </div>

              <div className="relative p-8 flex flex-col items-center text-center h-full z-10">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-[1rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2 mb-4 relative z-10">
                    <ItemLogo
                      imageName={tool.imageName}
                      fallbackIcon={tool.icon}
                      className="w-full h-full object-contain"
                      iconClassName="w-8 h-8 text-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:-rotate-6"
                    />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 text-sm max-w-[250px]">
                  {tool.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-center border-t border-border/40 w-full">
                  <div className="flex items-center gap-2 px-6 py-2 rounded-xl border border-primary/20 text-primary font-medium group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                    <span className="text-sm">{t("products.page.cta_details")}</span>
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
          <Button variant="outline" size="lg" asChild className="rounded-xl px-12 group transition-all hover:bg-primary hover:text-primary-foreground">
            <Link to="/free">
              {t("free.preview.cta_all")}
              <ArrowRight className="w-4 h-4 ms-2 group-hover:translate-x-1 transitions-transform rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
