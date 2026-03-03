import React from 'react';
import { useTranslation } from "react-i18next";
import { Check, X } from "lucide-react";

interface PricingPlan {
    title: string;
    price: string;
    discount: string | null;
    description: string | null;
    features: string[];
    restrictions: string[];
    buttons?: { label: string; url: string }[];
}

interface PricingSectionProps {
    markdownContent: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ markdownContent }) => {
    const { i18n } = useTranslation();
    const isZero = (s: string) => {
        if (!s) return false;
        const numeric = s.replace(/[^\d.]/g, '');
        return numeric !== '' && parseFloat(numeric) === 0;
    };

    const formatUrl = (url: string) => {
        if (!url) return "";
        // Handle whatsapp: protocol
        if (url.startsWith('whatsapp:')) {
            const parts = url.replace('whatsapp:', '').split('?');
            const number = parts[0].replace(/\/\/+/, ''); // Remove any stray slashes
            const params = new URLSearchParams(parts[1] || "");
            const message = params.get('message') || params.get('text') || "";
            return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
        }
        return url;
    };

    const getPricingPlans = () => {
        if (!markdownContent) return [];

        // Remove HTML comments
        const cleanMarkdown = markdownContent.replace(/<!--[\s\S]*?-->/g, '');

        const isAr = i18n.language === "ar";

        // Split by language markers
        const langBlocks = cleanMarkdown.split(/##\s+(?=English|🌍\s+English|English\s+🌍|العربية|Arabic|العربية\s+🕌)/i);
        let englishPart = "";
        let arabicPart = "";

        langBlocks.forEach(block => {
            if (block.match(/English|🌍/i)) englishPart = block;
            if (block.match(/العربية|Arabic|🕌/i)) arabicPart = block;
        });

        const content = isAr ? arabicPart : englishPart;
        if (!content) return [];

        // 1. Collect ALL link references from the entire markdown content
        const globalLinkRefs: Record<string, string> = {};
        markdownContent.split(/\r?\n/).forEach(line => {
            const m = line.trim().match(/^\[([^\]]+)\]:\s*(.*)$/i);
            if (m) {
                globalLinkRefs[m[1].toLowerCase().trim()] = m[2].trim();
            }
        });

        const plans: PricingPlan[] = [];
        // Split by 4 hashes to get each plan
        const sections = content.split(/\n####\s+/).slice(1);

        sections.forEach(section => {
            const firstLine = section.split('\n')[0].trim();
            if (!firstLine) return;

            const title = firstLine;
            const priceMatch = section.match(/\*\*Price:\*\* (.*?)$|\*\*السعر:\*\* (.*?)$/m);
            const discountMatch = section.match(/\*\*Discount:\*\* (.*?)$|\*\*الخصم:\*\* (.*?)$/m);
            const rawDiscount = discountMatch ? (discountMatch[1] || discountMatch[2]).trim() : null;
            const discount = (rawDiscount && !isZero(rawDiscount)) ? rawDiscount : null;
            const descMatch = section.match(/\*\*Description:\*\* (.*?)$|\*\*الوصف:\*\* (.*?)$/m);

            const extractList = (headerAr: string, headerEn: string) => {
                const regex = new RegExp(`#####\\s+(?:${headerEn}|${headerAr})\\s*([\\s\\S]*?)(?=(?:#####|####|$|---))`, 'i');
                const match = section.match(regex);
                if (match && match[1]) {
                    return match[1].trim().split('\n')
                        .map(l => l.trim())
                        .filter(l => l.startsWith('-') || l.startsWith('*') || l.startsWith('✅') || l.startsWith('❌') || l.startsWith('⚠'))
                        .map(l => l.replace(/^[-*✅❌⚠]\s*/, '').trim());
                }
                return [];
            };

            const extractButtons = () => {
                const regex = new RegExp(`#####\\s+(?:Buttons|الروابط|الأزرار|الطلب)\\s*([\\s\\S]*?)(?=(?:#####|####|$|---))`, 'i');
                const match = section.match(regex);
                if (match && match[1]) {
                    const buttonLines = match[1].trim().split('\n');
                    const parsed = buttonLines
                        .map(l => l.trim())
                        .map(l => {
                            // Match [label](url) OR [label][id]
                            const m = l.match(/\[(.*?)\](?:\((.*?)\)|\[(.*?)\])/);
                            if (m) {
                                const label = m[1];
                                const inlineUrl = m[2];
                                const refId = m[3];

                                let finalUrl = "";
                                if (refId !== undefined) {
                                    finalUrl = globalLinkRefs[refId.toLowerCase()] || "";
                                } else if (inlineUrl !== undefined) {
                                    finalUrl = globalLinkRefs[inlineUrl.toLowerCase()] || inlineUrl;
                                }

                                return { label, url: formatUrl(finalUrl) };
                            }
                            return null;
                        })
                        .filter((b): b is { label: string; url: string } => b !== null);
                    return parsed.length > 0 ? parsed : null;
                }
                return null;
            };

            plans.push({
                title,
                price: priceMatch ? (priceMatch[1] || priceMatch[2]).trim() : "0",
                discount,
                description: descMatch ? (descMatch[1] || descMatch[2]).trim() : null,
                features: extractList("المميزات", "Features"),
                restrictions: extractList("القيود", "Restrictions"),
                buttons: extractButtons() || undefined
            });
        });
        return plans;
    };

    const pricingPlans = getPricingPlans();

    if (pricingPlans.length === 0) return null;

    const headerStyles = [
        "bg-emerald-600/85 text-white border-b-emerald-500/20",
        "bg-primary/85 text-white border-b-primary/20",
        "bg-blue-500/85 text-white border-b-blue-500/20",
    ];

    return (
        <div className="mb-20 animate-fade-up delay-100 p-6 md:p-10 bg-card/70 backdrop-blur-md border border-border/40 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            {/* Background decorative glow - subtler */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-primary/5 blur-[80px] pointer-events-none"></div>

            <div className="flex flex-col items-center mb-10 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-[2px] bg-primary/30 rounded-full"></div>
                    <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-widest">
                        {i18n.language === "ar" ? "الخطط والأسعار" : "Plans & Pricing"}
                    </h2>
                    <div className="w-8 h-[2px] bg-primary/30 rounded-full"></div>
                </div>
                <div className="h-1 w-20 bg-primary/10 rounded-full"></div>
            </div>

            <div className={`grid grid-cols-1 gap-8 relative z-10 ${pricingPlans.length === 1 ? 'max-w-md mx-auto' :
                pricingPlans.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' :
                    'md:grid-cols-3'
                }`}>
                {pricingPlans.map((plan, index) => (
                    <div key={index} className="flex flex-col rounded-[2.5rem] bg-card/90 backdrop-blur-sm border border-border/80 shadow-md hover:border-primary/40 transition-all duration-500 overflow-hidden group/card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        {/* Header Area (Only Title) */}
                        <div className={`py-5 px-6 text-center shadow-inner ${headerStyles[index % 3]}`}>
                            <h3 className="text-2xl font-black tracking-tight">{plan.title}</h3>
                        </div>

                        {/* Price Section - Now on Card Background */}
                        <div className="py-6 px-6 text-center border-b border-border">
                            <div className="flex flex-col items-center justify-center min-h-[80px]">
                                {plan.discount ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold mb-1 line-through decoration-red-500 text-muted-foreground opacity-60">
                                            {plan.price}
                                        </span>
                                        <span className="text-4xl font-black tracking-tight text-primary">
                                            {plan.discount}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-4xl font-black tracking-tight text-primary">
                                        {isZero(plan.price)
                                            ? (i18n.language === "ar" ? "مجاني" : "FREE")
                                            : plan.price}
                                    </span>
                                )}
                                {plan.description && (
                                    <span className="mt-2 text-base font-bold uppercase tracking-widest text-muted-foreground">
                                        {plan.description}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 px-8 py-4 flex flex-col gap-4">
                            <div className="space-y-4 flex-1 min-h-[200px]">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/80 rtl:text-right ltr:text-left">
                                    {i18n.language === "ar" ? "المميزات:" : "Features:"}
                                </h4>
                                <ul className="space-y-3">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[14px] font-bold">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="leading-tight">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {plan.restrictions.length > 0 && (
                                <div className="pt-4 border-t border-border space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/80 rtl:text-right ltr:text-left">
                                        {i18n.language === "ar" ? "القيود:" : "Restrictions:"}
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.restrictions.map((r, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[13px] text-muted-foreground/70 font-bold">
                                                <X className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
                                                <span className="leading-tight">{r}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className={`p-10 pt-0 flex flex-col gap-3`}>
                            {plan.buttons && plan.buttons.length > 0 ? (
                                plan.buttons.map((btn, btnIndex) => {
                                    const isValidUrl = (url: string) => {
                                        if (!url) return false;
                                        return /^(https?:\/\/|mailto:|tel:|#)/i.test(url);
                                    };
                                    const isUrlValid = isValidUrl(btn.url);

                                    return (
                                        <button
                                            key={btnIndex}
                                            onClick={() => isUrlValid && window.open(btn.url, "_blank")}
                                            className={`w-full h-14 rounded-2xl font-black transition-all duration-300 shadow-sm active:scale-95 group-hover:scale-[1.02] ${btnIndex === 0 && index === 1
                                                ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                                                : "bg-background border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                                                } ${!isUrlValid ? "opacity-70 cursor-default grayscale-[0.5]" : ""}`}
                                        >
                                            {btn.label}
                                        </button>
                                    );
                                })
                            ) : (
                                <button
                                    onClick={() => window.open("https://wa.me/218928198656", "_blank")}
                                    className={`w-full h-14 rounded-2xl font-black transition-all duration-300 shadow-sm active:scale-95 group-hover:scale-[1.02] ${index === 1
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                                        : "bg-background border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                                        }`}
                                >
                                    {i18n.language === "ar" ? "طلب المنتج" : "Order Product"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
