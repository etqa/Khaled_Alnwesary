import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-card/90 backdrop-blur-md shadow-card border-t border-border/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("contact.tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground mb-10">
            {t("contact.subtitle")}
          </p>

          <Button variant="hero" size="lg" asChild>
            <a href="https://wa.me/218928198656" target="_blank" rel="noopener noreferrer">
              <Send className="w-5 h-5 rtl:pl-1 rtl:rotate-180" />
              {t("contact.cta_now")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
