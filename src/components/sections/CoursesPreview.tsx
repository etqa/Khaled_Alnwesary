import { Play, Clock, Users, ArrowRight, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CoursesPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-card/40 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl border border-border overflow-hidden hover-lift group">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/5 to-primary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 geometric-pattern opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500" />

          <div className="relative p-8 md:p-12 lg:p-16">
            {/* Top Row: Tag and Icon */}
            <div className="flex justify-between items-start mb-8">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                {t("common.paid")}
              </span>
            </div>

            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("courses.blender.title")}
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t("courses.blender.desc")}
              </p>

              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{t("courses.blender.stats.hours")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{t("courses.blender.stats.students")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Play className="w-5 h-5 text-primary" />
                  <span>{t("courses.blender.stats.type")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild className="rounded-xl px-10 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  <Link to="/courses/blender">
                    {t("courses.preview.cta_details")}
                    <ArrowRight className="w-5 h-5 rtl:mr-2 ltr:ml-2 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-xl">
                  <Link to="/courses">
                    {t("courses.preview.cta_all")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
