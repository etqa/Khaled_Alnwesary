import { ArrowRight, Code2, Building2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">{t("hero.badge")}</span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t("hero.title_first")}{" "}
            <span className="text-gradient">{t("hero.title_last")}</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-300 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-52 text-sm sm:text-base px-2 sm:px-8">
              <Link to="/services">
                {t("hero.cta_services")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-52 text-sm sm:text-base px-2 sm:px-8">
              <Link to="/products">
                {t("hero.cta_products")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-52 text-sm sm:text-base px-2 sm:px-8">
              <Link to="/free">
                {t("hero.cta_free")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-52 text-sm sm:text-base px-2 sm:px-8">
              <Link to="/courses">
                {t("hero.cta_courses")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-400 grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">+7</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("hero.stats.experience")}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">+5</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("hero.stats.products")}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Layers className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">+100</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("hero.stats.projects")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
