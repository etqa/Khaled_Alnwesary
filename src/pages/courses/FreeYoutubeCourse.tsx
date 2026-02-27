import { useTranslation } from "react-i18next";
import { Play, MessageCircle, BookOpen, ExternalLink, Youtube, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DynamicButtons } from "@/components/details/DynamicButtons";

interface FreeYoutubeCourseProps {
    id: string;
    markdownContent: string;
    youtubeLink: string;
    playlistLink: string;
}

const FreeYoutubeCourse = ({ id, markdownContent, youtubeLink, playlistLink }: FreeYoutubeCourseProps) => {
    const { t } = useTranslation();
    const {
        overviewContent,
        courseContent,
        readmeContent,
        buttons,
        titleContent
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
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <span className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-6">
                            <Gift className="w-4 h-4" />
                            {t("common.free")}
                        </span>

                        <h1 className="animate-fade-up delay-100 text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {courseTitle}
                        </h1>

                        {overviewContent && (
                            <div className="animate-fade-up delay-200 prose prose-slate dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed mb-8">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {overviewContent}
                                </ReactMarkdown>
                            </div>
                        )}

                        {/* Video Player */}
                        <div className="animate-fade-up delay-300 rounded-2xl overflow-hidden border border-border shadow-2xl mb-10 aspect-video bg-black">
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

                        {buttons && buttons.length > 0 ? (
                            <div className="animate-fade-up delay-400">
                                <DynamicButtons buttons={buttons} />
                            </div>
                        ) : (
                            <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4">
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
                </div>
            </section>

            {/* Course Content */}
            {courseContent && (
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-card p-8 md:p-12 rounded-[2rem] shadow-premium border border-border animate-fade-up">
                                <h2 className="text-2xl font-bold text-foreground mb-10 border-s-4 border-primary ps-4">
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
                <section className="py-16">
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
