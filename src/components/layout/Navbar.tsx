import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Home, LayoutGrid, Package, Gift, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const navLinks = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/services", labelKey: "nav.services", icon: LayoutGrid },
  { href: "/products", labelKey: "nav.products", icon: Package },
  { href: "/free", labelKey: "nav.free", icon: Gift },
  { href: "/courses", labelKey: "nav.courses", icon: GraduationCap },
];

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      // Default to dark if no preference or if 'dark' is stored
      return stored !== "light";
    }
    return true;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen
        ? "bg-background/95 backdrop-blur-xl shadow-card"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}favicon.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              {t("nav.brand_name")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <link.icon className="w-4 h-4" />
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0 rounded-full hover:bg-muted relative group transition-all duration-300"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 py-8" : "max-h-0 opacity-0"
            } border-t border-border/50`}
        >
          <div className="flex flex-col items-center gap-2">
            {navLinks.map((link, index) => (
              <div key={link.href} className="w-full flex flex-col items-center">
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center px-4 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {t(link.labelKey)}
                </Link>
                {index < navLinks.length - 1 && (
                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
