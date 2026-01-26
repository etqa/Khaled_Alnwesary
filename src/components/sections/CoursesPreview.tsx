import { Play, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CoursesPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
          <div className="absolute inset-0 geometric-pattern opacity-50" />

          <div className="relative p-8 md:p-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <Play className="w-4 h-4" />
                {t("courses.preview.tag")}
              </span>

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
                <Button variant="hero" size="lg" asChild>
                  <Link to="/courses/blender">
                    {t("courses.preview.cta_details")}
                    <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
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
