import { Button } from "@/components/ui/button";
import {
    MessageCircle,
    Download,
    Globe,
    Smartphone,
    Monitor,
    ExternalLink,
    Youtube,
    Play,
    Video,
    Clock,
    ChevronDown,
    ShoppingBag,
    Sparkles
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { ButtonItem } from "@/hooks/useReadme";

interface DynamicButtonsProps {
    buttons: ButtonItem[];
}

const getIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (
        lowerLabel.includes("تواصل") ||
        lowerLabel.includes("contact") ||
        lowerLabel.includes("whatsapp") ||
        lowerLabel.includes("واتس") ||
        lowerLabel.includes("طلب") ||
        lowerLabel.includes("order") ||
        lowerLabel.includes("تفعيل") ||
        lowerLabel.includes("اشتراك") ||
        lowerLabel.includes("subscribe") ||
        lowerLabel.includes("استفسار") ||
        lowerLabel.includes("تسجيل") ||
        lowerLabel.includes("register") ||
        lowerLabel.includes("inquire")
    ) {
        return MessageCircle;
    }
    if (
        lowerLabel.includes("يوتيوب") ||
        lowerLabel.includes("youtube") ||
        lowerLabel.includes("playlist") ||
        lowerLabel.includes("قائمة")
    ) {
        return Youtube;
    }
    if (
        lowerLabel.includes("رندر") ||
        lowerLabel.includes("render") ||
        lowerLabel.includes("فيديو") ||
        lowerLabel.includes("video") ||
        lowerLabel.includes("شرح") ||
        lowerLabel.includes("tutorial")
    ) {
        return Video;
    }
    if (
        lowerLabel.includes("مشاهدة") ||
        lowerLabel.includes("view") ||
        lowerLabel.includes("عرض") ||
        lowerLabel.includes("play") ||
        lowerLabel.includes("معرض") ||
        lowerLabel.includes("portfolio")
    ) {
        return Play;
    }
    if (
        lowerLabel.includes("ويندوز") ||
        lowerLabel.includes("windows") ||
        lowerLabel.includes("pc")
    ) {
        return Monitor;
    }
    if (
        lowerLabel.includes("أندرويد") ||
        lowerLabel.includes("android") ||
        lowerLabel.includes("هاتف") ||
        lowerLabel.includes("phone")
    ) {
        return Smartphone;
    }
    if (
        lowerLabel.includes("تحميل") ||
        lowerLabel.includes("download") ||
        lowerLabel.includes("تنزيل") ||
        lowerLabel.includes("أداة") ||
        lowerLabel.includes("مشغل") ||
        lowerLabel.includes("software")
    ) {
        return Download;
    }
    if (
        lowerLabel.includes("أونلاين") ||
        lowerLabel.includes("online") ||
        lowerLabel.includes("رابط") ||
        lowerLabel.includes("link") ||
        lowerLabel.includes("موقع")
    ) {
        return Globe;
    }
    if (
        lowerLabel.includes("قريبا") ||
        lowerLabel.includes("soon")
    ) {
        return Clock;
    }
    return ExternalLink;
};

const getOptionIcon = (label: string, url: string) => {
    const combined = `${label} ${url}`.toLowerCase();
    if (combined.includes("play.google") || combined.includes("متجر") || combined.includes("store")) {
        return ShoppingBag;
    }
    if (combined.includes("microsoft") || combined.includes("ويندوز") || combined.includes("windows")) {
        return Monitor;
    }
    if (combined.includes("apple") || combined.includes("ios") || combined.includes("iphone") || combined.includes("ايفون")) {
        return Smartphone;
    }
    if (
        combined.includes("تحميل") ||
        combined.includes("download") ||
        combined.includes("direct") ||
        combined.includes("مباشر") ||
        combined.includes("pcloud") ||
        combined.includes("drive")
    ) {
        return Download;
    }
    return ExternalLink;
};

const getOptionSubtitle = (label: string, url: string, isArabic: boolean) => {
    const lower = url.toLowerCase();
    if (lower.includes("play.google.com") || lower.includes("google.com/store")) {
        return "Google Play";
    }
    if (lower.includes("apps.microsoft.com")) {
        return "Microsoft Store";
    }
    if (lower.includes("apple.com") || lower.includes("testflight")) {
        return "App Store";
    }
    if (lower.includes("pcloud")) {
        return "pCloud Storage";
    }
    if (lower.includes("mediafire")) {
        return "MediaFire";
    }
    if (lower.includes("drive.google")) {
        return "Google Drive";
    }
    if (lower.endsWith(".apk")) {
        return isArabic ? "تثبيت مباشر APK" : "Direct APK";
    }
    if (lower.endsWith(".exe") || lower.endsWith(".zip") || lower.endsWith(".rar")) {
        return isArabic ? "ملف تثبيت مباشر" : "Direct Setup File";
    }
    return isArabic ? "رابط خارجي" : "External Link";
};

export const DynamicButtons = ({ buttons }: DynamicButtonsProps) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    if (!buttons || buttons.length === 0) return null;

    const isValidUrl = (url: string) => {
        if (!url) return false;
        return /^(https?:\/\/|mailto:|tel:|#)/i.test(url);
    };

    return (
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-3.5 mb-10 w-full">
            {buttons.map((button, index) => {
                const Icon = getIcon(button.label);
                const hasOptions = button.options && button.options.length > 1;

                // Multi-option button (Dropdown)
                if (hasOptions && button.options) {
                    return (
                        <DropdownMenu key={index} dir={isArabic ? "rtl" : "ltr"}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="hero"
                                    size="lg"
                                    className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px] rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base px-5 h-14 group flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span>{button.label}</span>
                                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 opacity-75 flex-shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="center"
                                sideOffset={8}
                                style={{ direction: isArabic ? "rtl" : "ltr" }}
                                className="w-[260px] p-2 rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/25 z-50 animate-in fade-in-0 zoom-in-95 text-start"
                            >
                                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b border-border/40 mb-1.5 flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                                    <span>{t("common.choose_source")}</span>
                                </div>
                                <div className="space-y-1">
                                    {button.options.map((option, optIdx) => {
                                        const OptionIcon = getOptionIcon(option.label, option.url);
                                        return (
                                            <DropdownMenuItem
                                                key={optIdx}
                                                asChild
                                                className="cursor-pointer rounded-xl p-0 focus:bg-primary/10 focus:text-primary transition-all duration-200"
                                            >
                                                <a
                                                    href={option.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors group/item"
                                                >
                                                    <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover/item:bg-primary group-hover/item:text-primary-foreground flex items-center justify-center flex-shrink-0 text-primary transition-colors">
                                                        <OptionIcon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex flex-col text-start flex-1 min-w-0">
                                                        <span className="font-bold text-sm truncate">{option.label}</span>
                                                        <span className="text-[11px] text-muted-foreground truncate group-hover/item:text-primary/70 transition-colors">
                                                            {getOptionSubtitle(option.label, option.url, isArabic)}
                                                        </span>
                                                    </div>
                                                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/60 group-hover/item:text-primary flex-shrink-0 rtl:-scale-x-100 transition-colors" />
                                                </a>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                }

                // Single URL or invalid URL
                const isUrlValid = isValidUrl(button.url);

                if (!isUrlValid) {
                    return (
                        <Button
                            key={index}
                            variant="hero"
                            size="lg"
                            className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px] rounded-2xl shadow-lg shadow-primary/20 transition-all opacity-70 cursor-default text-sm sm:text-base px-5 h-14 whitespace-nowrap flex items-center justify-center gap-2"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span>{button.label}</span>
                        </Button>
                    );
                }

                return (
                    <Button
                        key={index}
                        variant="hero"
                        size="lg"
                        asChild
                        className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px] rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base px-5 h-14 whitespace-nowrap cursor-pointer"
                    >
                        <a
                            href={button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span>{button.label}</span>
                        </a>
                    </Button>
                );
            })}
        </div>
    );
};
