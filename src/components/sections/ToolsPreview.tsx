import { Puzzle, BookOpen, CheckSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ToolsPreview = () => {
  const { t } = useTranslation();

  const tools = [
    {
      title: t("tools.items.kh_tools.title"),
      description: t("tools.items.kh_tools.desc"),
      icon: Puzzle,
      link: "/tools/kh-tools",
    },
    {
      title: t("tools.items.quran_app.title"),
      description: t("tools.items.quran_app.desc"),
      icon: BookOpen,
      link: "/tools/quran-app",
    },
    {
      title: t("tools.items.task_manager.title"),
      description: t("tools.items.task_manager.desc"),
      icon: CheckSquare,
      link: "/tools/task-manager",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("tools.preview.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("tools.preview.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("tools.preview.subtitle")}
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/tools">
                {t("tools.preview.cta_all")}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          <div className="lg:w-1/2 space-y-4">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="flex items-center gap-5 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
