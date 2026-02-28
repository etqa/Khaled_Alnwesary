import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface DetailLayoutProps {
    children: ReactNode;
    parentLink: string;
    parentText: string;
    itemTitle: string;
}

export const DetailLayout = ({ children, parentLink, parentText, itemTitle }: DetailLayoutProps) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-8">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 py-6">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">{t("nav.home")}</Link>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        <Link to={parentLink} className="hover:text-foreground transition-colors">{parentText}</Link>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        <span className="text-foreground font-medium">{itemTitle}</span>
                    </nav>
                </div>
                {children}
            </main>
            <Footer />
        </div>
    );
};
