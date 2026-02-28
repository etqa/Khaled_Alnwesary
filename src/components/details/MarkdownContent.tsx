import { useState, Children, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Check } from "lucide-react";
import { ImageModal } from "@/components/ui/ImageModal";

interface MarkdownContentProps {
    content: string;
}

const getYoutubeEmbedUrl = (url: string) => {
    // Standard video URL
    const videoIdMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    if (videoIdMatch && videoIdMatch[2].length === 11) {
        let embedUrl = `https://www.youtube.com/embed/${videoIdMatch[2]}`;
        // Support for playlists within the same link
        const playlistIdMatch = url.match(/[&?]list=([^&]+)/);
        if (playlistIdMatch) {
            embedUrl += `?list=${playlistIdMatch[1]}`;
        }
        return embedUrl;
    }
    // Playlist only URL
    const playlistIdMatch = url.match(/[&?]list=([^&]+)/);
    if (playlistIdMatch) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistIdMatch[1]}`;
    }
    return null;
};

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt?: string } | null>(null);
    const cleanContent = content.replace(/<!--[\s\S]*?-->/g, '');

    return (
        <div className="bg-card/80 border border-border/50 rounded-[2.5rem] p-6 md:p-12 shadow-sm backdrop-blur-md">
            <div className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-black prose-headings:text-foreground prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-10 prose-h1:text-center
        prose-h2:text-2xl prose-h2:text-primary prose-h2:mt-16 prose-h2:mb-8
        prose-p:text-muted-foreground/90 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
        prose-strong:text-foreground prose-strong:font-bold
        prose-ul:my-8 prose-li:text-muted-foreground prose-li:text-lg prose-li:mb-4 prose-li:marker:text-primary
        prose-code:bg-primary/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-primary prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-12 prose-img:mx-auto">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        img: ({ node, ...props }) => (
                            <img
                                {...props}
                                className="rounded-[2.5rem] shadow-2xl my-12 mx-auto cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                                onClick={() => setSelectedImage({ src: props.src || "", alt: props.alt })}
                            />
                        ),
                        h3: ({ node, ...props }) => {
                            const title = props.children?.toString() || "";
                            const isFeatures = title.includes('المميزات') || title.includes('Features');
                            const isTutorials = title.includes('فيديوهات توضيحية') || title.includes('Video Tutorials');

                            if (isTutorials) return null;

                            return (
                                <div className={`flex items-center gap-4 mt-16 mb-8 p-4 rounded-2xl ${isFeatures ? 'bg-primary/5 border border-primary/10 shadow-sm' : ''}`}>
                                    <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                                    <h3 {...props} className="text-2xl font-black text-foreground m-0 tracking-tight" />
                                </div>
                            );
                        },
                        h4: ({ node, ...props }) => {
                            return (
                                <div className="mt-16 mb-8 relative group">
                                    <div className="flex flex-col">
                                        <h4 {...props} className="text-lg md:text-xl font-black text-foreground tracking-tight m-0 w-fit" />
                                        {/* Underline Decoration */}
                                        <div className="h-0.5 w-full bg-gradient-to-r ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary/60 via-primary/30 to-transparent mt-1.5 rounded-full transform ltr:origin-left rtl:origin-right transition-all duration-700 group-hover:bg-primary/80"></div>
                                    </div>
                                    {/* Subtle background highlight for the whole line */}
                                    <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-primary/5 to-transparent -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            );
                        },
                        p: ({ node, children, ...props }) => {
                            let youtubeUrl = "";

                            // Check if paragraph contains exactly one link and it's a youtube link
                            const childrenArray = Children.toArray(children);
                            if (childrenArray.length === 1 && isValidElement(childrenArray[0])) {
                                const child = childrenArray[0];
                                const childProps = child.props as any;
                                if (childProps.href && (childProps.href.includes('youtube.com') || childProps.href.includes('youtu.be'))) {
                                    youtubeUrl = childProps.href;
                                }
                            }

                            const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;
                            if (embedUrl) {
                                return (
                                    <div className="my-6 w-full animate-fade-up">
                                        <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 bg-black">
                                            <iframe
                                                src={embedUrl}
                                                className="absolute inset-0 w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                );
                            }

                            return <p {...props} className="text-muted-foreground/90 text-lg leading-relaxed mb-8">{children}</p>;
                        },
                        ul: ({ node, ...props }) => (
                            <ul {...props} className="p-0 m-0 space-y-4 list-none" />
                        ),
                        li: ({ node, children, ...props }) => {
                            let youtubeUrl = "";
                            let label = "";

                            const findData = (child: any) => {
                                if (typeof child === 'string') {
                                    const ytMatch = child.match(/(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s]+)/);
                                    if (ytMatch) {
                                        youtubeUrl = ytMatch[1];
                                    } else if (!label && child.trim() && !child.includes('http')) {
                                        // Use the text as a label if it's not a URL and we don't have one yet
                                        label = child.replace(/[\[\]\(\)]/g, '').trim();
                                    }
                                } else if (isValidElement(child)) {
                                    const childProps = child.props as any;
                                    const isYoutube = childProps.href && (childProps.href.includes('youtube.com') || childProps.href.includes('youtu.be'));

                                    if (isYoutube) {
                                        youtubeUrl = childProps.href;
                                    }

                                    if (childProps.children) {
                                        Children.forEach(childProps.children, findData);
                                    }
                                } else if (Array.isArray(child)) {
                                    child.forEach(findData);
                                }
                            };

                            Children.forEach(children, findData);
                            const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

                            if (embedUrl) {
                                return (
                                    <div className="my-6 w-full animate-fade-up group/video">
                                        {label && (
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-6 w-2 bg-primary rounded-full group-hover/video:scale-y-110 transition-transform duration-300"></div>
                                                <h5 className="text-xl md:text-2xl font-black text-foreground tracking-tight m-0">{label}</h5>
                                            </div>
                                        )}
                                        <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 bg-black group-hover/video:shadow-primary/20 transition-all duration-500">
                                            <iframe
                                                src={embedUrl}
                                                className="absolute inset-0 w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={label || "Video Tutorial"}
                                            />
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <li {...props} className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                    <div className="text-lg font-medium text-foreground/90 group-hover:text-primary transition-colors flex-1">
                                        {children}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                </li>
                            );
                        },
                        a: ({ node, ...props }) => {
                            let url = props.href || "";
                            if (url.startsWith('whatsapp:')) {
                                const parts = url.replace('whatsapp:', '').split('?');
                                const number = parts[0].replace(/\/\/+/, '');
                                const params = new URLSearchParams(parts[1] || "");
                                const message = params.get('message') || params.get('text') || "";
                                url = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
                            }

                            const isValidUrl = (u: string) => {
                                if (!u) return false;
                                return /^(https?:\/\/|mailto:|tel:|#)/i.test(u);
                            };

                            const isUrlValid = isValidUrl(url);

                            return (
                                <a
                                    {...props}
                                    href={isUrlValid ? url : undefined}
                                    onClick={!isUrlValid ? (e) => e.preventDefault() : props.onClick}
                                    style={!isUrlValid ? { cursor: 'default', opacity: 0.8 } : props.style}
                                    target={isUrlValid && url.startsWith('http') ? "_blank" : undefined}
                                    rel={isUrlValid && url.startsWith('http') ? "noopener noreferrer" : undefined}
                                />
                            );
                        }
                    }}
                >
                    {cleanContent}
                </ReactMarkdown>
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                src={selectedImage?.src || ""}
                alt={selectedImage?.alt}
            />
        </div>
    );
};
