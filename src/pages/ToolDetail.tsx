import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Puzzle, BookOpen, CheckSquare, ArrowRight, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ToolDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [overviewContent, setOverviewContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState<string | null>(null);
  const [dynamicDownloadUrl, setDynamicDownloadUrl] = useState<string | null>(null);

  const toolsData = {
    "kh-tools": {
      title: t("tools.items.kh_tools.title"),
      description: t("tools.items.kh_tools.desc"),
      longDescription: t("tools.items.kh_tools.long_desc_detail"),
      icon: Puzzle,
      downloadUrl: "https://github.com/etqangroup2019/KH-TOOLS/archive/refs/heads/main.zip",
      readmeUrl: "https://raw.githubusercontent.com/etqangroup2019/KH-TOOLS/main/README.md",
    },
    "quran-app": {
      title: t("tools.items.quran_app.title"),
      description: t("tools.items.quran_app.desc"),
      longDescription: t("tools.items.quran_app.long_desc_detail"),
      icon: BookOpen,
      downloadUrl: "https://etqangroup2019.github.io/quran/",
      readmeUrl: "https://raw.githubusercontent.com/etqangroup2019/quran/main/README.md",
    },
    "task-manager": {
      title: t("tools.items.task_manager.title"),
      description: t("tools.items.task_manager.desc"),
      longDescription: t("tools.items.task_manager.long_desc_detail"),
      icon: CheckSquare,
      downloadUrl: "#",
      features: [
        t("tools.items.task_manager.features.0"),
        t("tools.items.task_manager.features.1"),
        t("tools.items.task_manager.features.2"),
        t("tools.items.task_manager.features.3"),
        t("tools.items.task_manager.features.4"),
        t("tools.items.task_manager.features.5"),
      ],
    },
  };

  const tool = toolsData[id as keyof typeof toolsData] as any;
  const currentDownloadUrl = dynamicDownloadUrl || tool?.downloadUrl;

  useEffect(() => {
    if (tool?.readmeUrl) {
      setLoading(true);
      // Add a timestamp and cache: 'no-store' to bypass all caches
      const cacheBustUrl = `${tool.readmeUrl}?t=${new Date().getTime()}`;
      fetch(cacheBustUrl, { cache: 'no-store' })
        .then((res) => res.text())
        .then((text) => {
          const currentLang = i18n.language; // 'ar' or 'en'
          let processedContent = text;

          // Splitting logic for READMEs that contain both English and Arabic sections
          const englishMarkers = [/##\s+English/i, /##\s+🌍\s+English/i, /##\s+English\s+🌍/i];
          const arabicMarkers = [/##\s+العربية/i, /##\s+🕌\s+العربية/i, /##\s+العربية\s+🕌/i, /##\s+العربية\s+\(Arabic\)/i];

          // Find start positions
          let englishPos = -1;
          for (const marker of englishMarkers) {
            const match = text.match(marker);
            if (match && match.index !== undefined) {
              englishPos = match.index;
              break;
            }
          }

          let arabicPos = -1;
          for (const marker of arabicMarkers) {
            const match = text.match(marker);
            if (match && match.index !== undefined) {
              arabicPos = match.index;
              break;
            }
          }

          if (englishPos !== -1 && arabicPos !== -1) {
            if (currentLang === 'ar') {
              if (arabicPos > englishPos) {
                processedContent = text.substring(arabicPos);
              } else {
                processedContent = text.substring(arabicPos, englishPos);
              }
            } else {
              if (englishPos > arabicPos) {
                processedContent = text.substring(englishPos);
              } else {
                processedContent = text.substring(englishPos, arabicPos);
              }
            }
          } else if (englishPos !== -1 && currentLang === 'en') {
            processedContent = text.substring(englishPos);
          } else if (arabicPos !== -1 && currentLang === 'ar') {
            processedContent = text.substring(arabicPos);
          }

          // Clean up: remove the language header itself if it's at the very beginning
          processedContent = processedContent.replace(/^(?:##\s+.*(?:\r?\n|$))/, '').trim();

          // Remove version indicator from the markdown content
          processedContent = processedContent.replace(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[\d.]+\s*(?:\r?\n|$)/i, '').trim();

          // Extract Overview section if it exists
          const overviewRegex = /(###\s+(?:Overview|نظرة عامة).*?)(?=###|$)/s;
          const overviewMatch = processedContent.match(overviewRegex);

          if (overviewMatch) {
            setOverviewContent(overviewMatch[1].trim());
            processedContent = processedContent.replace(overviewRegex, '').trim();
          } else {
            setOverviewContent(null);
          }

          // Extract Download Link - Improved regex to be more flexible
          const downloadRegex = /(?:###\s*|(?:\*\*|__)?)(?:رابط التحميل|Download Link|تحميل|Download)(?:(?:\*\*|__)?)?[:\s]*[\r\n]*\s*(?:\[.*?\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s\r\n]+))/i;
          const downloadMatch = text.match(downloadRegex);
          if (downloadMatch) {
            const url = downloadMatch[1] || downloadMatch[2];
            if (url) {
              setDynamicDownloadUrl(url);
            }
          } else {
            const processedDownloadMatch = processedContent.match(downloadRegex);
            if (processedDownloadMatch) {
              const url = processedDownloadMatch[1] || processedDownloadMatch[2];
              if (url) {
                setDynamicDownloadUrl(url);
              }
            }
          }

          // Remove Download Link section from processedContent to avoid duplication
          const downloadSectionRegex = /(?:###\s+|(?:(?:\*\*|__)?)?)(?:رابط التحميل|Download Link|تحميل|Download)(?:(?:\*\*|__)?)?.*?(?=###|$)/si;
          processedContent = processedContent.replace(downloadSectionRegex, '').trim();

          setReadmeContent(processedContent);

          // Extract version from the full text
          const versionMatch = text.match(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*([\d.]+)/i);
          if (versionMatch) {
            setVersion(versionMatch[1]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch readme:", err);
          setLoading(false);
        });
    }
  }, [tool?.readmeUrl, i18n.language]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">{t("common.tool_not_found")}</h1>
            <Button asChild>
              <Link to="/tools">{t("common.back_to_tools")}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">{t("nav.home")}</Link>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            <Link to="/tools" className="hover:text-foreground transition-colors">{t("tools.preview.tag")}</Link>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-foreground font-medium">{tool.title}</span>
          </nav>
        </div>

        {/* Tool Hero */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="animate-fade-up flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-12">
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
                        v{version}
                      </span>
                    )}
                  </div>

                  {currentDownloadUrl && (
                    <div className="mb-8">
                      <Button variant="hero" size="lg" asChild className="rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                        <a href={currentDownloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                          {t("common.free_download")}
                        </a>
                      </Button>
                    </div>
                  )}

                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {tool.description}
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
                    <tool.icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                  </div>
                </div>
              </div>

              {/* Main Content (README) */}
              <div className="animate-fade-up delay-150 mb-20">
                {readmeContent ? (
                  <div className="bg-card/50 border border-border/50 rounded-[2.5rem] p-6 md:p-12 shadow-sm backdrop-blur-sm">
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
                        components={{
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
                        {readmeContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card/50 border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {tool.longDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Features Section */}
              {tool.features && tool.features.length > 0 && (
                <div className="animate-fade-up delay-200">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                    <h2 className="text-3xl font-black text-foreground tracking-tight">{t("common.features")}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tool.features.map((feature: string, index: number) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="text-lg font-medium text-foreground/90 group-hover:text-primary transition-colors">{feature}</span>
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetail;
