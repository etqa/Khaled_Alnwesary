import { Button } from "@/components/ui/button";
import { MessageCircle, Download, Globe, Smartphone, Monitor, ExternalLink, Youtube, Play, Video } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ButtonData {
    label: string;
    url: string;
}

interface DynamicButtonsProps {
    buttons: ButtonData[];
}

const getIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (
        lowerLabel.includes("تواصل") ||
        lowerLabel.includes("contact") ||
        lowerLabel.includes("whatsapp") ||
        lowerLabel.includes("واتس") ||
        lowerLabel.includes("طلب") ||
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
    return ExternalLink;
};


export const DynamicButtons = ({ buttons }: DynamicButtonsProps) => {
    const { i18n } = useTranslation();

    if (!buttons || buttons.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10 w-full">
            {buttons.map((button, index) => {
                const Icon = getIcon(button.label);
                return (
                    <Button
                        key={index}
                        variant="hero"
                        size="lg"
                        asChild
                        className="w-full sm:w-auto min-w-[190px] rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base px-6 h-14"
                    >
                        <a
                            href={button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                        >
                            <Icon className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                            {button.label}
                        </a>
                    </Button>
                );
            })}
        </div>
    );
};
