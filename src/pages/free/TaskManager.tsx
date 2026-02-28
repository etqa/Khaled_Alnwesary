import { useTranslation } from "react-i18next";
import { CheckSquare, Sparkles } from "lucide-react";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { DynamicButtons } from "@/components/details/DynamicButtons";
import { ItemLogo } from "@/components/details/ItemLogo";
import localReadme from "./TaskManager.md?raw";

const TaskManager = () => {
    const { t } = useTranslation();
    const {
        readmeContent,
        overviewContent,
        titleContent,
        shortDesc,
        version,
        buttons
    } = useReadme({
        localContent: localReadme,
        id: "task-manager"
    });

    const tool = {
        title: titleContent || "",
        description: shortDesc || "",
        icon: CheckSquare,
    };

    return (
        <DetailLayout
            parentLink="/free"
            parentText={t("free.preview.tag")}
            itemTitle={tool.title}
        >
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="animate-fade-up flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-4">
                            <div className="flex flex-col items-center md:items-start text-center md:text-start flex-1 order-2 md:order-1 pt-4">
                                <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                                    {tool.title}
                                </h1>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-bold border border-green-500/20">
                                        {t("common.free")}
                                    </span>
                                    {version && (
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                            V{version}
                                        </span>
                                    )}
                                </div>

                                <DynamicButtons buttons={buttons} />
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2">
                                    <ItemLogo
                                        imageName="TaskManager"
                                        fallbackIcon={tool.icon}
                                        className="w-full h-full object-contain"
                                        iconClassName="w-12 h-12 md:w-16 md:h-16 text-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Overview Section */}
                        {overviewContent && (
                            <div className="mb-8 p-8 md:p-10 bg-card/60 backdrop-blur-md border border-border/50 rounded-[2.5rem] shadow-sm animate-fade-up">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">{t("common.overview")}</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none
                                    prose-h3:text-2xl prose-h3:font-black prose-h3:text-foreground prose-h3:mb-4
                                    prose-p:text-muted-foreground prose-p:text-lg prose-p:leading-relaxed">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                        {overviewContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}

                        {/* Main Content (README) */}
                        <div className="animate-fade-up delay-150 mb-0">
                            {readmeContent && <MarkdownContent content={readmeContent} />}
                        </div>
                    </div>
                </div>
            </section>
        </DetailLayout>
    );
};

export default TaskManager;
