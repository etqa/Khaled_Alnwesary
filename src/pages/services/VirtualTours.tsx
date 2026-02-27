import { useTranslation } from "react-i18next";
import { Video, FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import { DetailLayout } from "@/components/layout/DetailLayout";
import { useReadme } from "@/hooks/useReadme";
import { MarkdownContent } from "@/components/details/MarkdownContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { DynamicButtons } from "@/components/details/DynamicButtons";
import localReadme from "./VirtualTours.md?raw";

const YouTubeEmbed = ({ url }: { url: string }) => {
    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getVideoId(url);

    if (videoId) return (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg aspect-video my-8 border border-white/10 bg-black">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
            />
        </div >
    );

    return null;
};

const FacebookEmbed = ({ url }: { url: string }) => {
    // Check if it's a Facebook URL
    if (!url.includes("facebook.com")) return null;

    // Use a larger width for the embed request to get high res
    const embedWidth = 750;

    // Encode the URL for the iframe src
    const encodedUrl = encodeURIComponent(url);
    // Use show_text=false to focus on the media/360 view
    const src = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=false&width=${embedWidth}`;

    return (
        <div className="w-full flex justify-center my-8">
            <div className="relative w-full max-w-[750px] overflow-hidden rounded-xl shadow-md bg-white border border-border/50">
                <iframe
                    src={src}
                    width={embedWidth}
                    height="420"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="w-full"
                />
            </div>
        </div>
    );
};

const VirtualTours = () => {
    const { t } = useTranslation();
    const {
        overviewContent,
        portfolioContent,
        featuresContent,
        termsContent,
        collaborationContent,
        readmeContent,
        buttons,
        titleContent,
        shortDesc
    } = useReadme({
        localContent: localReadme,
        id: "virtual-tours",
        isService: true
    });

    const service = {
        title: titleContent || "",
        description: shortDesc || "",
        icon: Video,
    };

    return (
        <DetailLayout
            parentLink="/services"
            parentText={t("services.preview.tag")}
            itemTitle={service.title}
        >
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Header Section */}
                        <div className="animate-fade-up flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12">
                            <div className="flex flex-col items-center md:items-start text-center md:text-start flex-1 order-2 md:order-1 pt-4">
                                <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
                                    {service.title}
                                </h1>

                                <DynamicButtons buttons={buttons} />

                                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                    {service.description}
                                </p>

                                {overviewContent && (
                                    <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeRaw]}
                                        >
                                            {overviewContent}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-primary flex items-center justify-center shadow-glow">
                                    <service.icon className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 mb-16">
                            {/* Consolidated Service Info Section */}
                            {(featuresContent || collaborationContent || termsContent) && (
                                <div className="bg-card/80 border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm animate-fade-up backdrop-blur-md">
                                    {/* Features Subsection */}
                                    {featuresContent && (
                                        <div className="mb-12 last:mb-0">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <Sparkles className="w-5 h-5 text-primary" />
                                                </div>
                                                <h2 className="text-xl font-bold text-foreground">{t("common.features")}</h2>
                                            </div>
                                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                    components={{
                                                        ul: ({ node, ...props }) => <ul {...props} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none p-0" />,
                                                        li: ({ node, children, ...props }) => (
                                                            <li className="flex items-center justify-center p-4 rounded-2xl bg-background/50 border border-border hover:border-primary/20 transition-colors text-center">
                                                                <span className="text-foreground font-medium">{children}</span>
                                                            </li>
                                                        )
                                                    }}
                                                >
                                                    {featuresContent}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )}

                                    {/* Divider if Features and (Collaboration or Terms) exist */}
                                    {featuresContent && (collaborationContent || termsContent) && (
                                        <div className="h-px bg-border/50 my-12" />
                                    )}

                                    {/* Collaboration Subsection */}
                                    {collaborationContent && (
                                        <div className="mb-12 last:mb-0">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <ImageIcon className="w-5 h-5 text-primary" />
                                                </div>
                                                <h2 className="text-xl font-bold text-foreground">{t("services.page.detail.collaboration_way")}</h2>
                                            </div>
                                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        ol: ({ node, ...props }) => <ol {...props} className="not-prose flex flex-col gap-y-4 !p-0 !m-0 [counter-reset:service-step]" />,
                                                        li: ({ node, children, ...props }) => (
                                                            <li className="flex items-start gap-3 text-base md:text-lg text-muted-foreground leading-relaxed group [counter-increment:service-step]">
                                                                <div className="w-10 flex justify-center shrink-0 mt-1">
                                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                                                        <span className="text-xs font-bold text-primary leading-none after:content-[counter(service-step)]" />
                                                                    </div>
                                                                </div>
                                                                <span className="group-hover:text-foreground transition-colors">{children}</span>
                                                            </li>
                                                        )
                                                    }}
                                                >
                                                    {collaborationContent}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )}

                                    {/* Divider if Collaboration and Terms exist */}
                                    {collaborationContent && termsContent && (
                                        <div className="h-px bg-border/50 my-12" />
                                    )}

                                    {/* Terms Subsection */}
                                    {termsContent && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-primary" />
                                                </div>
                                                <h2 className="text-xl font-bold text-foreground">{t("services.page.detail.terms_title")}</h2>
                                            </div>
                                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        ol: ({ node, ...props }) => <ol {...props} className="not-prose flex flex-col gap-y-4 !p-0 !m-0 [counter-reset:service-step]" />,
                                                        li: ({ node, children, ...props }) => (
                                                            <li className="flex items-start gap-3 text-base md:text-lg text-muted-foreground leading-relaxed group [counter-increment:service-step]">
                                                                <div className="w-10 flex justify-center shrink-0 mt-1">
                                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                                                        <span className="text-xs font-bold text-primary leading-none after:content-[counter(service-step)]" />
                                                                    </div>
                                                                </div>
                                                                <span className="group-hover:text-foreground transition-colors">{children}</span>
                                                            </li>
                                                        )
                                                    }}
                                                >
                                                    {termsContent}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Portfolio Section with Videos */}
                            {portfolioContent && (
                                <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm animate-fade-up">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Video className="w-6 h-6 text-primary" />
                                        <h2 className="text-3xl font-black text-foreground tracking-tight">{t("services.page.detail.portfolio_title")}</h2>
                                    </div>
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeRaw]}
                                            components={{
                                                a: ({ node, href, children, ...props }) => {
                                                    if (!href) return <>{children}</>;

                                                    const yt = YouTubeEmbed({ url: href });
                                                    if (yt) return yt;

                                                    const fb = FacebookEmbed({ url: href });
                                                    if (fb) return fb;

                                                    return (
                                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 break-all">
                                                            {href}
                                                        </a>
                                                    );
                                                },
                                                p: ({ node, children }) => {
                                                    // This is to prevent p tags from wrapping divs which is invalid HTML
                                                    return <div className="mb-4">{children}</div>;
                                                }
                                            }}
                                        >
                                            {portfolioContent}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}

                            {/* Rest of the content */}
                            {readmeContent && (
                                <div className="animate-fade-up">
                                    <MarkdownContent content={readmeContent} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </DetailLayout >
    );
};

export default VirtualTours;
