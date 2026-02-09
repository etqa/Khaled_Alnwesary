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
}

interface PricingSectionProps {
    markdownContent: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ markdownContent }) => {
    const { i18n } = useTranslation();

    const getPricingPlans = () => {
        if (!markdownContent) return [];

        const isAr = i18n.language === "ar";

        // Split by language markers
        const langBlocks = markdownContent.split(/##\s+(?=English|🌍\s+English|English\s+🌍|العربية|Arabic|العربية\s+🕌)/i);
        let englishPart = "";
        let arabicPart = "";

        langBlocks.forEach(block => {
            if (block.match(/English|🌍/i)) englishPart = block;
            if (block.match(/العربية|Arabic|🕌/i)) arabicPart = block;
        });

        const content = isAr ? arabicPart : englishPart;
        if (!content) return [];

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
            // Treat "0", "0 دينار", "$0" etc as no discount
            const discount = (rawDiscount && !rawDiscount.startsWith('0')) ? rawDiscount : null;
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

            plans.push({
                title,
                price: priceMatch ? (priceMatch[1] || priceMatch[2]).trim() : "0",
                discount,
                description: descMatch ? (descMatch[1] || descMatch[2]).trim() : null,
                features: extractList("المميزات", "Features"),
                restrictions: extractList("القيود", "Restrictions")
            });
        });
        return plans;
    };

    const pricingPlans = getPricingPlans();

    if (pricingPlans.length === 0) return null;

    const headerStyles = [
        "bg-emerald-600 text-white border-b-emerald-500/20",
        "bg-primary text-white border-b-primary/20",
        "bg-blue-600 text-white border-b-blue-500/20",
    ];

    return (
        <div className="mb-20 animate-fade-up delay-100">
            <h2 className="text-2xl md:text-3xl font-black mb-12 text-center md:text-start">
                {i18n.language === "ar" ? "الخطط والأسعار" : "Plans & Pricing"}
            </h2>
            <div className={`grid grid-cols-1 gap-6 ${pricingPlans.length === 1 ? 'max-w-md mx-auto' :
                pricingPlans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
                    'md:grid-cols-3'
                }`}>
                {pricingPlans.map((plan, index) => (
                    <div key={index} className="flex flex-col rounded-[2.5rem] bg-card/80 backdrop-blur-md border border-border shadow-sm hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                        {/* Header Area (Only Title) */}
                        <div className={`py-4 px-6 text-center ${headerStyles[index % 3]}`}>
                            <h3 className="text-2xl font-black tracking-tight">{plan.title}</h3>
                        </div>

                        {/* Price Section - Now on Card Background */}
                        <div className="py-6 px-6 text-center border-b border-border">
                            <div className="flex flex-col items-center justify-center min-h-[80px]">
                                {plan.discount ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-lg font-bold mb-1 line-through text-muted-foreground opacity-40">
                                            {plan.price}
                                        </span>
                                        <span className="text-4xl font-black tracking-tight text-primary">
                                            {plan.discount}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-4xl font-black tracking-tight text-primary">
                                        {(plan.price === "0" || plan.price === "$0" || plan.price?.startsWith("0"))
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

                        <div className="p-10 pt-0">
                            <button
                                onClick={() => window.open("https://wa.me/218928198656", "_blank")}
                                className={`w-full h-14 rounded-2xl font-black transition-all duration-300 shadow-sm active:scale-95 group-hover:scale-[1.02] ${index === 1
                                    ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                                    : "bg-background border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                                    }`}
                            >
                                {i18n.language === "ar" ? "طلب المنتج" : "Order Product"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
