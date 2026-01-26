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
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState<string | null>(null);

  const toolsData = {
    "kh-tools": {
      title: t("tools.items.kh_tools.title"),
      description: t("tools.items.kh_tools.desc"),
      longDescription: t("tools.items.kh_tools.long_desc_detail"),
      icon: Puzzle,
      downloadUrl: "https://github.com/etqangroup2019/KH-TOOLS/archive/refs/heads/main.zip",
      readmeUrl: "https://raw.githubusercontent.com/etqangroup2019/KH-TOOLS/main/README.md",
      features: [
        t("tools.items.kh_tools.features.0"),
        t("tools.items.kh_tools.features.1"),
        t("tools.items.kh_tools.features.2"),
        t("tools.items.kh_tools.features.3"),
        t("tools.items.kh_tools.features.4"),
        t("tools.items.kh_tools.features.5"),
      ],
    },
    "quran-app": {
      title: t("tools.items.quran_app.title"),
      description: t("tools.items.quran_app.desc"),
      longDescription: t("tools.items.quran_app.long_desc_detail"),
      icon: BookOpen,
      downloadUrl: "#",
      features: [
        t("tools.items.quran_app.features.0"),
        t("tools.items.quran_app.features.1"),
        t("tools.items.quran_app.features.2"),
        t("tools.items.quran_app.features.3"),
        t("tools.items.quran_app.features.4"),
        t("tools.items.quran_app.features.5"),
      ],
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

  useEffect(() => {
    if (tool?.readmeUrl) {
      setLoading(true);
      // Add a timestamp to bypass browser cache
      const cacheBustUrl = `${tool.readmeUrl}?t=${new Date().getTime()}`;
      fetch(cacheBustUrl)
        .then((res) => res.text())
        .then((text) => {
          const currentLang = i18n.language; // 'ar' or 'en'
          let processedContent = text;

          // Split content into Arabic and English sections if they exist
          // Looking for headers like ## العربية (Arabic) or ## English
          const segments = text.split(/##\s+(?:العربية\s+\(Arabic\)|English)/i);

          if (segments.length > 1) {
            // Very basic heuristic: if text contains "العربية", it might be the Arabic section
            // Based on your README: English is often first, then Arabic
            if (currentLang === 'ar') {
              // Arabic is usually the second segment if it follows English
              // Let's refine: find which segment contains Arabic characters or specific keywords
              const arabicSegment = segments.find(s => s.includes('نظرة عامة') || s.includes('المؤلف'));
              if (arabicSegment) processedContent = arabicSegment;
            } else {
              const englishSegment = segments.find(s => s.includes('Overview') || s.includes('Author'));
              if (englishSegment) processedContent = englishSegment;
            }
          }

          setReadmeContent(processedContent);

          // Extract version from the full text to be safe
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
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">{t("nav.home")}</Link>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            <Link to="/tools" className="hover:text-foreground">{t("tools.preview.tag")}</Link>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-foreground">{tool.title}</span>
          </nav>
        </div>

        {/* Tool Hero */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-fade-up flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <tool.icon className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-bold border border-green-500/20 mb-2">
                    {t("common.free")}
                  </span>
                  {version && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 mr-2 rtl:ml-2">
                      v{version}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {tool.title}
                  </h1>
                </div>
              </div>

              {tool.downloadUrl && (
                <div className="animate-fade-up delay-75 mb-8">
                  <Button variant="hero" size="lg" asChild>
                    <a href={tool.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5 rtl:ml-2 ltr:mr-2" />
                      {t("common.free_download")}
                    </a>
                  </Button>
                </div>
              )}

              <div className="animate-fade-up delay-100 mb-12">
                {readmeContent ? (
                  <div className="prose prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h1:text-3xl prose-h1:mb-8
                    prose-h2:text-2xl prose-h2:text-primary prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-primary/10
                    prose-h3:text-xl prose-h3:text-foreground/90 prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-ul:my-6 prose-li:text-muted-foreground prose-li:mb-2 prose-li:marker:text-primary
                    prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
                    prose-img:rounded-2xl prose-img:shadow-card prose-img:my-8">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readmeContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {tool.longDescription}
                  </p>
                )}
              </div>

            </div>
          </div>
        </section>

        {!readmeContent && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8">{t("common.features")}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tool.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="animate-fade-up flex items-center gap-4 p-5 rounded-xl bg-card border border-border"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetail;
