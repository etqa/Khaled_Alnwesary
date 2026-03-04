import { useTranslation } from "react-i18next";
import { Monitor, Smartphone, Globe, Laptop, HelpCircle } from "lucide-react";

interface PlatformBadgesProps {
    platforms: string[];
}

export const PlatformBadges = ({ platforms }: PlatformBadgesProps) => {
    const { t } = useTranslation();
    if (!platforms || platforms.length === 0) return null;

    const getIcon = (platform: string) => {
        const p = platform.toLowerCase().trim();
        if (p.includes('win') || p.includes('ويندوز') || p.includes('pc')) return Monitor;
        if (p.includes('android') || p.includes('أندرويد') || p.includes('ios') || p.includes('iphone') || p.includes('آيفون') || p.includes('mobile') || p.includes('جوال')) return Smartphone;
        if (p.includes('mac') || p.includes('ماك') || p.includes('apple') || p.includes('laptop') || p.includes('لابتوب')) return Laptop;
        if (p.includes('online') || p.includes('web') || p.includes('browser') || p.includes('أونلاين') || p.includes('موقع')) return Globe;
        return null;
    };

    const getLabel = (platform: string) => {
        const p = platform.toLowerCase().trim();
        if (p.includes('win') || p.includes('ويندوز') || p.includes('pc')) return t('common.platforms.windows');
        if (p.includes('android') || p.includes('أندرويد')) return t('common.platforms.android');
        if (p.includes('ios') || p.includes('iphone') || p.includes('آيفون')) return t('common.platforms.ios');
        if (p.includes('mac') || p.includes('ماك') || p.includes('apple')) return t('common.platforms.mac');
        if (p.includes('online') || p.includes('web') || p.includes('browser') || p.includes('أونلاين') || p.includes('موقع')) return t('common.platforms.online');
        return platform;
    };

    return (
        <div className="flex flex-wrap gap-2">
            {platforms.map((platform, index) => {
                const Icon = getIcon(platform);
                const label = getLabel(platform);
                return (
                    <span
                        key={index}
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20"
                    >
                        {Icon && <Icon className="w-4 h-4 rtl:ml-2 ltr:mr-2" />}
                        {label}
                    </span>
                );
            })}
        </div>
    );
};
