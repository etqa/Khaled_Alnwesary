import { Link } from "react-router-dom";
import { Facebook, Youtube, MessageCircle, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1CnV7XpzGx/",
    labelKey: "footer.social.facebook",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/channel/UCi27il8T6SbWDVgGPF0Tz5w",
    labelKey: "footer.social.youtube",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/218928198656",
    labelKey: "footer.social.whatsapp",
  },
];

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/products", labelKey: "nav.products" },
  { href: "/free", labelKey: "nav.free" },
  { href: "/courses", labelKey: "nav.courses" },
];

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gradient-to-br from-card via-card to-card/95 border-t border-border/50 mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-30 pointer-events-none" />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl border-2 border-primary/20 overflow-hidden shadow-glow group-hover:shadow-elevated transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-primary/10 to-transparent">
                <img
                  src={`${import.meta.env.BASE_URL}favicon.jpg`}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-foreground group-hover:text-gradient transition-all duration-300">
                  {t("nav.brand_name")}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {t("footer.brand_subtitle")}
                </p>
              </div>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md text-base">
              {t("footer.description")}
            </p>

            {/* Decorative Line */}
            <div className="flex items-center gap-3 max-w-md">
              <div className="h-1 flex-1 bg-gradient-primary rounded-full opacity-50" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="h-1 flex-1 bg-gradient-primary rounded-full opacity-50" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 text-center">
            <h4 className="font-bold text-lg text-foreground relative inline-block">
              {t("footer.quick_links")}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-primary rounded-full" />
            </h4>
            <ul className="space-y-3 flex flex-col items-center">
              {navLinks.map((link, index) => (
                <li key={link.href} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 inline-block group"
                  >
                    <span className="group-hover:text-gradient transition-all duration-300">
                      {t(link.labelKey)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6 text-center">
            <h4 className="font-bold text-lg text-foreground relative inline-block">
              {t("footer.contact_us")}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-primary rounded-full" />
            </h4>
            <ul className="space-y-5 flex flex-col items-center">
              <li>
                <a
                  href="https://wa.me/218928198656"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span dir="ltr" className="font-medium">
                    +218 92 819 8656
                  </span>
                </a>
              </li>

              {/* Social Links */}
              <li className="pt-2">
                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-muted-foreground hover:from-primary hover:to-primary/80 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-glow animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      aria-label={t(social.labelKey)}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="relative mt-12 pt-8">
          {/* Decorative Divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-primary rounded-full" />

          <div className="text-center space-y-3">
            <p className="text-muted-foreground text-sm font-medium">
              {t("footer.all_rights_reserved", { year: new Date().getFullYear() })}
            </p>

            {/* Signature */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
              <span>Made with</span>
              <span className="text-primary animate-pulse">🧡</span>
              <span>by {t("nav.brand_name")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
