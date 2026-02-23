import { useTranslation } from "react-i18next";
import { Wrench } from "lucide-react";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PricingSection } from "@/components/products/PricingSection";
import { DynamicButtons } from "@/components/details/DynamicButtons";
import localReadme from "./EngineerSystemLite.md?raw";
import pricingMarkdown from "./EngineerSystemLite_Prices.md?raw";

const EngineerSystemLite = () => {
    const { t } = useTranslation();
    const {
        readmeContent,
        overviewContent,
        version,
        buttons
    } = useReadme({
        localContent: localReadme,
        id: "engineer-system-lite",
        isProduct: true
    });


    const product = {
        title: t("products.items.engineer_system_lite.title"),
        description: t("products.items.engineer_system_lite.desc"),
        icon: Wrench,
    };

    return (
        <DetailLayout
            parentLink="/products"
            parentText={t("products.preview.tag")}
            itemTitle={product.title}
        >
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="animate-fade-up flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12">
                            <div className="flex flex-col items-center md:items-start text-center md:text-start flex-1 order-2 md:order-1 pt-4">
                                <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                                    {product.title}
                                </h1>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                                    {version && (
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                            v{version}
                                        </span>
                                    )}
                                </div>

                                <DynamicButtons buttons={buttons} />


                                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                    {product.description}
                                </p>

                                {/* Dynamic Overview from README */}
                                {overviewContent && (
                                    <div className="mt-8 prose prose-slate dark:prose-invert max-w-none
                    prose-h3:text-2xl prose-h3:font-black prose-h3:text-foreground prose-h3:mb-4
                    prose-p:text-muted-foreground prose-p:text-lg prose-p:leading-relaxed">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {overviewContent}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5">
                                    <product.icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <PricingSection markdownContent={pricingMarkdown} />

                        {/* Main Content (README) */}
                        <div className="animate-fade-up delay-150 mb-20 text-balance">
                            {readmeContent && <MarkdownContent content={readmeContent} />}
                        </div>
                    </div>
                </div>
            </section>
        </DetailLayout>
    );
};

export default EngineerSystemLite;
