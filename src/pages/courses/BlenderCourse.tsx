import { useTranslation } from "react-i18next";
import { Play, Clock, Users, Check, MessageCircle, BookOpen, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { DynamicButtons } from "@/components/details/DynamicButtons";
import { ItemLogo } from "@/components/details/ItemLogo";
import localReadme from "./BlenderCourse.md?raw";

const BlenderCourse = () => {
    const { t } = useTranslation();
    const {
        overviewContent,
        courseContent,
        featuresContent,
        statsContent,
        readmeContent,
        buttons,
        titleContent,
        shortDesc,
        longDesc,
        version
    } = useReadme({
        localContent: localReadme,
        id: "blender-course",
        isCourse: true
    });


    const course = {
        title: titleContent || "",
        description: shortDesc || "",
        longDescription: longDesc || "",
        icon: BookOpen,
        duration: t("courses.blender.stats.hours"),
        students: t("courses.blender.stats.students"),
        type: t("courses.blender.stats.type_detail"),
    };

    let moduleIndex = 0;

    return (
        <DetailLayout
            parentLink="/courses"
            parentText={t("courses.preview.tag")}
            itemTitle={course.title}
        >
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-6">
                            <div className="flex flex-col items-center md:items-start text-center md:text-start flex-1 order-2 md:order-1 pt-2 md:pt-0">
                                <h1 className="animate-fade-up text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                                    {course.title}
                                </h1>

                                <div className="animate-fade-up delay-100 flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                        <Crown className="w-4 h-4 inline-block rtl:ml-2 ltr:mr-2" />
                                        {t("common.paid")}
                                    </span>
                                    {version && (
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                            V{version}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="animate-fade-up shrink-0 order-1 md:order-2">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2">
                                    <ItemLogo
                                        imageName="BlenderCourse"
                                        fallbackIcon={course.icon}
                                        className="w-full h-full object-contain"
                                        iconClassName="w-12 h-12 md:w-16 md:h-16 text-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="animate-fade-up delay-200 flex flex-wrap gap-6 mb-8">
                            {statsContent ? (
                                <div className="flex flex-wrap gap-6">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            ul: ({ children }) => <>{children}</>,
                                            li: ({ children }) => {
                                                const text = children?.toString() || "";
                                                let icon = <Clock className="w-5 h-5 text-primary" />;
                                                if (text.includes("Student") || text.includes("طلاب")) icon = <Users className="w-5 h-5 text-primary" />;
                                                if (text.includes("Type") || text.includes("النوع")) icon = <Play className="w-5 h-5 text-primary" />;

                                                return (
                                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                                        {icon}
                                                        <span>{children}</span>
                                                    </div>
                                                );
                                            },
                                            p: ({ children }) => <>{children}</>
                                        }}
                                    >
                                        {statsContent}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Users className="w-5 h-5 text-primary" />
                                        <span>{course.students}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                        <Play className="w-5 h-5 text-primary" />
                                        <span>{course.type}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="animate-fade-up delay-300 mb-0">
                            {buttons && buttons.length > 0 ? (
                                <DynamicButtons buttons={buttons} />
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button variant="hero" size="lg" asChild>
                                        <a href="https://wa.me/218928198656" target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                                            {t("common.register_course")}
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild>
                                        <a href="https://wa.me/218928198656" target="_blank" rel="noopener noreferrer">
                                            {t("common.inquire_price")}
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {overviewContent && (
                            <div className="mb-0 p-8 md:p-8 bg-card/60 backdrop-blur-md border border-border/50 rounded-[2.5rem] shadow-sm animate-fade-up">
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

                    </div>
                </div>
            </section>

            {/* Course Content */}
            {courseContent && (
                <section className="pt-4 pb-8 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-card p-8 md:p-12 pt-6 md:pt-8 rounded-[2rem] shadow-premium border border-border animate-fade-up">
                                <h2 className="text-2xl font-bold text-foreground mb-6 border-s-4 border-primary ps-4">
                                    {t("common.course_content")}
                                </h2>
                                <div className="space-y-6">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h4: ({ children }) => {
                                                moduleIndex++;
                                                return (
                                                    <div className="animate-fade-up p-6 bg-muted/50 border-b border-border first:rounded-t-2xl">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                                                                {moduleIndex}
                                                            </div>
                                                            <h3 className="text-lg font-bold text-foreground m-0">{children}</h3>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                            ul: ({ children }) => (
                                                <div className="animate-fade-up p-6 bg-card border-x border-b border-border last:rounded-b-2xl mb-6 last:mb-0">
                                                    <ul className="space-y-3 m-0 p-0 list-none">
                                                        {children}
                                                    </ul>
                                                </div>
                                            ),
                                            li: ({ children }) => (
                                                <li className="flex items-center gap-3 text-muted-foreground list-none">
                                                    <Play className="w-4 h-4 text-primary shrink-0 rtl:rotate-180" />
                                                    <span>{children}</span>
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

            {/* What You Get / Features */}
            {featuresContent && (
                <section className="pt-16 pb-8">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-foreground mb-8">{t("common.what_you_get")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ul: ({ children }) => <>{children}</>,
                                        li: ({ children }) => (
                                            <div className="animate-fade-up flex items-center gap-4 p-5 rounded-xl bg-card border border-border">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Check className="w-5 h-5 text-primary" />
                                                </div>
                                                <span className="text-foreground">{children}</span>
                                            </div>
                                        ),
                                        p: ({ children }) => <>{children}</>
                                    }}
                                >
                                    {featuresContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Rest of README content if any */}
            {readmeContent && (
                <section className="pt-16 pb-8">
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

export default BlenderCourse;
