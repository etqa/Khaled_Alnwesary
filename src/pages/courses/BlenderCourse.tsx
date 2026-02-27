import { useTranslation } from "react-i18next";
import { Play, Clock, Users, Check, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DynamicButtons } from "@/components/details/DynamicButtons";
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
        longDesc
    } = useReadme({
        localContent: localReadme,
        id: "blender-course",
        isCourse: true
    });


    const course = {
        title: titleContent || "",
        description: shortDesc || "",
        longDescription: longDesc || "",
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
                        <span className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            {t("courses.page.main_course_badge")}
                        </span>

                        <h1 className="animate-fade-up delay-100 text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {course.title}
                        </h1>

                        {overviewContent ? (
                            <div className="animate-fade-up delay-200 prose prose-slate dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed mb-8">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {overviewContent}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <p className="animate-fade-up delay-200 text-lg text-muted-foreground leading-relaxed mb-8">
                                {course.longDescription}
                            </p>
                        )}

                        <div className="animate-fade-up delay-300 flex flex-wrap gap-6 mb-10">
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
                                                    <div className="flex items-center gap-2 text-foreground">
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
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Users className="w-5 h-5 text-primary" />
                                        <span>{course.students}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Play className="w-5 h-5 text-primary" />
                                        <span>{course.type}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {buttons && buttons.length > 0 ? (
                            <div className="animate-fade-up delay-400">
                                <DynamicButtons buttons={buttons} />
                            </div>
                        ) : (
                            <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4">
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
                </div>
            </section>

            {/* Course Content */}
            {courseContent && (
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-foreground mb-8">{t("common.course_content")}</h2>
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
                </section>
            )}

            {/* What You Get / Features */}
            {featuresContent && (
                <section className="py-16">
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

export default BlenderCourse;
