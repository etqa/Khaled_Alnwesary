import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Package, Gift, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileNav = () => {
    const { t } = useTranslation();

    const navItems = [
        { href: "/", labelKey: "nav.home", icon: Home },
        { href: "/services", labelKey: "nav.services", icon: LayoutGrid },
        { href: "/products", labelKey: "nav.products", icon: Package },
        { href: "/free", labelKey: "nav.free", icon: Gift },
        { href: "/courses", labelKey: "nav.courses", icon: GraduationCap },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe shadow-lg">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 ${isActive
                                    ? "text-primary scale-110"
                                    : "text-muted-foreground hover:text-foreground"
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                {t(item.labelKey)}
                            </span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNav;
