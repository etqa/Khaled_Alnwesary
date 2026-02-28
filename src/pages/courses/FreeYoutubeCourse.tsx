import { useTranslation } from "react-i18next";
import { Play, MessageCircle, BookOpen, ExternalLink, Youtube, Gift, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { DynamicButtons } from "@/components/details/DynamicButtons";
import { ItemLogo } from "@/components/details/ItemLogo";

interface FreeYoutubeCourseProps {
    id: string;
    markdownContent: string;
    youtubeLink: string;
    playlistLink: string;
    logoName?: string;
}

const FreeYoutubeCourse = ({ id, markdownContent, youtubeLink, playlistLink, logoName }: FreeYoutubeCourseProps) => {
    const { t } = useTranslation();
    const {
        overviewContent,
        courseContent,
        readmeContent,
        buttons,
        titleContent,
        version
    } = useReadme({
        localContent: markdownContent,
        id: id,
        isCourse: true
    });

    const courseTitle = titleContent || "";

    let moduleIndex = 0;

    return (
        <DetailLayout
            parentLink="/courses"
            parentText={t("courses.preview.tag")}
            itemTitle={courseTitle}
        >
            <section className="pt-12 md:pt-20 pb-0">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-6">
                            <div className="flex flex-col items-center md:items-start text-center md:text-start flex-1 order-2 md:order-1 pt-2 md:pt-0">
                                <h1 className="animate-fade-up text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                                    {courseTitle}
                                </h1>

                                <div className="animate-fade-up delay-100 flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-bold border border-green-500/20">
                                        <Gift className="w-4 h-4 inline-block rtl:ml-2 ltr:mr-2" />
                                        {t("common.free")}
                                    </span>
                                    {version && (
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                            V{version}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {logoName && (
                                <div className="animate-fade-up shrink-0 order-1 md:order-2">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2">
                                        <ItemLogo
                                            imageName={logoName}
                                            fallbackIcon={Gift}
                                            className="w-full h-full object-contain"
                                            iconClassName="w-12 h-12 md:w-16 md:h-16 text-primary"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="animate-fade-up delay-150 mb-10">
                            {buttons && buttons.length > 0 ? (
                                <DynamicButtons buttons={buttons} />
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button variant="hero" size="lg" className="bg-red-600 hover:bg-red-700 border-none shadow-lg shadow-red-600/20" asChild>
                                        <a href={playlistLink} target="_blank" rel="noopener noreferrer">
                                            <Youtube className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                                            {t("courses.preview.cta_details")}
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild>
                                        <a href="https://wa.me/218928198656" target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                                            {t("footer.contact_us")}
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {overviewContent && (
                            <div className="mb-10 p-8 md:p-10 bg-card/60 backdrop-blur-md border border-border/50 rounded-[2.5rem] shadow-sm animate-fade-up">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">{t("common.overview")}</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                        {overviewContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}

                        {/* Video Player */}
                        <div className="animate-fade-up delay-300 rounded-2xl overflow-hidden border border-border shadow-2xl mb-8 aspect-video bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={youtubeLink}
                                title={courseTitle}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                    </div>
                </div>
            </section>

            {/* Course Content */}
            {courseContent && (
                <section className="pt-2 pb-0 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-card p-8 md:p-12 !pt-4 rounded-[2rem] shadow-premium border border-border animate-fade-up">
                                <h2 className="text-2xl font-bold text-foreground !mt-4 mb-6 border-s-4 border-primary ps-4">
                                    {t("common.course_content")}
                                </h2>
                                <div className="space-y-6">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h4: ({ children }) => {
                                                moduleIndex++;
                                                return (
                                                    <div className="mb-8 last:mb-0">
                                                        <div className="flex items-center gap-4 mb-6">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0 shadow-lg">
                                                                {moduleIndex}
                                                            </div>
                                                            <h3 className="text-xl font-bold text-foreground m-0">{children}</h3>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                            ul: ({ children }) => (
                                                <ul className="grid gap-4 m-0 p-0 list-none">
                                                    {children}
                                                </ul>
                                            ),
                                            li: ({ children }) => (
                                                <li className="flex items-center gap-4 p-5 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 group">
                                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                                                        <Check className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <span className="text-foreground font-medium">{children}</span>
                                                </li>
                                            )
                                        }}
                                    >
                                        {courseContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Rest of README content if any */}
            {readmeContent && (
                <section className="pt-16 pb-0">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <MarkdownContent content={readmeContent} />
                        </div>
                    </div>
                </section>
            )}
        </DetailLayout>
    );
};

export default FreeYoutubeCourse;
