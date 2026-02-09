import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Check } from "lucide-react";
import { ImageModal } from "@/components/ui/ImageModal";

interface MarkdownContentProps {
    content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt?: string } | null>(null);

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
                        ul: ({ node, ...props }) => (
                            <ul {...props} className="p-0 m-0 space-y-4 list-none" />
                        ),
                        li: ({ node, children, ...props }) => (
                            <li {...props} className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                <div className="text-lg font-medium text-foreground/90 group-hover:text-primary transition-colors flex-1">
                                    {children}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                                    <Check className="w-4 h-4 text-green-600" />
                                </div>
                            </li>
                        )
                    }}
                >
                    {content}
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
