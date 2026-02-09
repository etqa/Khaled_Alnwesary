import { Facebook, Youtube, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const socialLinks = [
  {
    icon: MessageCircle,
    href: "https://wa.me/218928198656",
    labelKey: "footer.social.whatsapp",
    color: "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1CnV7XpzGx/",
    labelKey: "footer.social.facebook",
    color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/channel/UCi27il8T6SbWDVgGPF0Tz5w",
    labelKey: "footer.social.youtube",
    color: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
  },
];

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

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${social.color}`}
              >
                <social.icon className="w-5 h-5" />
                <span>{t(social.labelKey)}</span>
              </a>
            ))}
          </div>

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
