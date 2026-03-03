import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface UseReadmeProps {
    readmeUrl?: string;
    id?: string;
    isProduct?: boolean;
    isService?: boolean;
    isCourse?: boolean;
    localContent?: string;
}

export const useReadme = ({ readmeUrl, id, isProduct, isService, isCourse, localContent }: UseReadmeProps) => {
    const { i18n } = useTranslation();
    const [readmeContent, setReadmeContent] = useState<string | null>(null);
    const [overviewContent, setOverviewContent] = useState<string | null>(null);
    const [titleContent, setTitleContent] = useState<string | null>(null);
    const [shortDesc, setShortDesc] = useState<string | null>(null);
    const [longDesc, setLongDesc] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [version, setVersion] = useState<string | null>(null);
    const [encryptionDownloadUrl, setEncryptionDownloadUrl] = useState<string | null>(null);
    const [playerDownloadUrl, setPlayerDownloadUrl] = useState<string | null>(null);
    const [tutorialsUrl, setTutorialsUrl] = useState<string | null>(null);
    const [buttons, setButtons] = useState<{ label: string; url: string }[]>([]);

    const [isPaid, setIsPaid] = useState(false);
    const [pricingContent, setPricingContent] = useState<string | null>(null);

    // Service specific content
    const [portfolioContent, setPortfolioContent] = useState<string | null>(null);
    const [featuresContent, setFeaturesContent] = useState<string | null>(null);
    const [termsContent, setTermsContent] = useState<string | null>(null);

    // Course specific content
    const [courseContent, setCourseContent] = useState<string | null>(null);
    const [statsContent, setStatsContent] = useState<string | null>(null);

    const [collaborationContent, setCollaborationContent] = useState<string | null>(null);

    useEffect(() => {
        const processText = (text: string) => {
            // 1. Extract and remove all Link Reference Definitions [id]: url
            const linkRefs: Record<string, string> = {};
            const lines = text.split(/\r?\n/);
            const cleanLines = lines.map(line => {
                const trimmed = line.trim();
                const m = trimmed.match(/^\[([^\]]+)\]:\s*(.*)$/i);
                if (m) {
                    const id = m[1].toLowerCase().trim();
                    const url = m[2].trim();
                    linkRefs[id] = url;
                    return "";
                }
                return line;
            });

            let cleanText = cleanLines.join('\n');
            cleanText = cleanText.replace(/<!--[\s\S]*?-->/g, '');

            const currentLang = i18n.language;
            const englishMarkers = [/##\s+English/i, /##\s+🌍\s+English/i, /##\s+English\s+🌍/i];
            const arabicMarkers = [/##\s+العربية/i, /##\s+|\s+العربية\s+🕌/i, /##\s+العربية\s+🕌/i, /##\s+العربية\s+\(Arabic\)/i];

            let englishPos = -1;
            for (const marker of englishMarkers) {
                const match = cleanText.match(marker);
                if (match && match.index !== undefined) {
                    englishPos = match.index;
                    break;
                }
            }

            let arabicPos = -1;
            for (const marker of arabicMarkers) {
                const match = cleanText.match(marker);
                if (match && match.index !== undefined) {
                    arabicPos = match.index;
                    break;
                }
            }

            let langContent = cleanText;
            if (englishPos !== -1 && arabicPos !== -1) {
                if (currentLang === 'ar') {
                    langContent = arabicPos > englishPos ? cleanText.substring(arabicPos) : cleanText.substring(arabicPos, englishPos);
                } else {
                    langContent = englishPos > arabicPos ? cleanText.substring(englishPos) : cleanText.substring(englishPos, arabicPos);
                }
            } else if (englishPos !== -1 && currentLang === 'en') {
                langContent = cleanText.substring(englishPos);
            } else if (arabicPos !== -1 && currentLang === 'ar') {
                langContent = cleanText.substring(arabicPos);
            }

            langContent = langContent.replace(/^(?:##\s+.*(?:\r?\n|$))/, '').trim();

            const firstMarkerPos = Math.min(
                englishPos === -1 ? Infinity : englishPos,
                arabicPos === -1 ? Infinity : arabicPos
            );

            let preamble = "";
            if (firstMarkerPos !== Infinity && firstMarkerPos > 0) {
                preamble = cleanText.substring(0, firstMarkerPos)
                    .replace(/^#\s+.*$/m, '')
                    .replace(/\[[^\]]+\]\(#[^)]+\)\s*\|\s*\[[^\]]+\]\(#[^)]+\)/gi, '')
                    .replace(/<a\s+name="[^"]*"><\/a>/gi, '')
                    .replace(/^-{3,}.*$/gm, '')
                    .trim();
            }

            let processedContent = preamble ? preamble + "\n\n" + langContent : langContent;

            // Extract and remove type (Paid/Free)
            const typeMatch = text.match(/(?:\*\*Type:\*\*|\*\*النوع:\*\*)\s*(Paid|Free|مدفوع|مجاني)/i);
            if (typeMatch) {
                const type = typeMatch[1].toLowerCase();
                setIsPaid(type === 'paid' || type === 'مدفوع');
            } else {
                // Default logic for isCourse
                if (isCourse) setIsPaid(true);
                else setIsPaid(false);
            }
            processedContent = processedContent.replace(/(?:\*\*Type:\*\*|\*\*النوع:\*\*)\s*(Paid|Free|مدفوع|مجاني)\s*(?:\r?\n|$)/i, '').trim();

            processedContent = processedContent.replace(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[vV]?\s*[\d.]+\s*(?:\r?\n|$)/i, '').trim();
            processedContent = processedContent.replace(/<a\s+name="[^"]*"><\/a>/gi, '').trim();
            processedContent = processedContent.replace(/^-{3,}\s*$/gm, '').trim();

            const formatUrl = (url: string) => {
                if (!url) return "";
                if (url.startsWith('whatsapp:')) {
                    const parts = url.replace('whatsapp:', '').split('?');
                    const number = parts[0].replace(/\/\/+/, '');
                    const params = new URLSearchParams(parts[1] || "");
                    const message = params.get('message') || params.get('text') || "";
                    return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
                }
                return url;
            };

            const resolveReferences = (content: string | null) => {
                if (!content) return null;
                let resolved = content;
                resolved = resolved.replace(/\[([^\]]+)\]\[([^\]]+)\]/g, (match, label, id) => {
                    const resolvedUrl = linkRefs[id.toLowerCase().trim()];
                    return resolvedUrl ? `[${label}](${formatUrl(resolvedUrl)})` : match;
                });
                resolved = resolved.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, id) => {
                    const resolvedUrl = linkRefs[id.toLowerCase().trim()];
                    return resolvedUrl ? `[${label}](${formatUrl(resolvedUrl)})` : match;
                });
                return resolved;
            };

            const extractSection = (regex: RegExp) => {
                const match = processedContent.match(regex);
                if (match && match[1]) {
                    const content = match[1].trim();
                    processedContent = processedContent.replace(regex, '').trim();
                    return resolveReferences(content);
                }
                return null;
            };

            const title = extractSection(/(?:###\s+)(?:Title)\s*(.*?)(?=###|$)/si);
            setTitleContent(title?.trim() || null);

            const shortDescVal = extractSection(/(?:###\s+)(?:Short Description|الوصف المختصر)\s*(.*?)(?=###|$)/si);
            setShortDesc(shortDescVal?.trim() || null);

            const longDescVal = extractSection(/(?:###\s+)(?:Long Description)\s*(.*?)(?=###|$)/si);
            setLongDesc(longDescVal?.trim() || null);

            const overview = extractSection(/(?:###\s+)(?:Overview|نظرة عامة)\s*(.*?)(?=###|$)/si);
            setOverviewContent(overview);

            const pricing = extractSection(/(?:###\s+)(?:Pricing|Pricing Plans|الأسعار|خطط الأسعار)\s*(.*?)(?=###|$)/si);
            setPricingContent(pricing);

            const buttonsSectionStr = extractSection(/(?:###\s+)(?:Buttons|الأزرار|الروابط|التحميلات|Links)\s*(.*?)(?=###|$)/si);
            if (buttonsSectionStr) {
                const buttonMatches = Array.from(buttonsSectionStr.matchAll(/\[(.*?)\](?:\((.*?)\)|\[(.*?)\])/g));
                const parsedButtons = buttonMatches.map(m => {
                    const label = m[1];
                    const inlineUrl = m[2];
                    const refId = m[3];
                    let finalUrl = "";
                    if (refId !== undefined) {
                        finalUrl = linkRefs[refId.toLowerCase()] || "";
                    } else if (inlineUrl !== undefined) {
                        finalUrl = linkRefs[inlineUrl.toLowerCase()] || inlineUrl;
                    }
                    if (finalUrl && !/^(https?:\/\/|mailto:|tel:|#|whatsapp:)/i.test(finalUrl) && !finalUrl.includes('.')) {
                        finalUrl = "";
                    }
                    return { label, url: formatUrl(finalUrl) };
                });
                setButtons(parsedButtons);
            } else {
                setButtons([]);
            }

            if (isService) {
                const portfolio = extractSection(/(?:###\s+)(?:Portfolio|معرض الأعمال)\s*(.*?)(?=###|$)/si);
                const features = extractSection(/(?:###\s+)(?:Features|المميزات)\s*(.*?)(?=###|$)/si);
                const terms = extractSection(/(?:###\s+)(?:Terms of Service|شروط الخدمة|شروط التعامل)\s*(.*?)(?=###|$)/si);
                const collaboration = extractSection(/(?:###\s+)(?:How to Collaborate|How to work|طريقة التعاون|كيفية التعامل)\s*(.*?)(?=###|$)/si);
                setPortfolioContent(portfolio);
                setFeaturesContent(features);
                setTermsContent(terms);
                setCollaborationContent(collaboration);
            }

            if (isCourse) {
                const course = extractSection(/(?:###\s+)(?:Course Content|محتوى الدورة|محتوى الكورس)\s*(.*?)(?=###|$)/si);
                const stats = extractSection(/(?:###\s+)(?:Stats|الإحصائيات)\s*(.*?)(?=###|$)/si);
                const features = extractSection(/(?:###\s+)(?:Features|المميزات)\s*(.*?)(?=###|$)/si);
                setCourseContent(course);
                setStatsContent(stats);
                setFeaturesContent(features);
            }

            const downloadSectionRegex = /(?:###\s+)(?:رابط التحميل|Download Link|تحميل|Download).*?(?=###|$)/si;
            const downloadMatch = processedContent.match(downloadSectionRegex);
            if (downloadMatch) {
                if (isProduct && id === 'file-encryption') {
                    const encryptMatch = downloadMatch[0].match(/(?:برنامج التشفير|Encryption Tool).*?[\r\n]+\s*(?:\[.*?\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s\r\n]+))/i);
                    const playerMatch = downloadMatch[0].match(/(?:برنامج المشغل|Player Tool).*?[\r\n]+\s*(?:\[.*?\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s\r\n]+))/i);
                    if (encryptMatch) setEncryptionDownloadUrl(encryptMatch[1] || encryptMatch[2]);
                    if (playerMatch) setPlayerDownloadUrl(playerMatch[1] || playerMatch[2]);
                } else {
                    const urlMatch = downloadMatch[0].match(/(?:\[.*?\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s\r\n]+))/i);
                    if (urlMatch) setEncryptionDownloadUrl(urlMatch[1] || urlMatch[2]);
                }
                processedContent = processedContent.replace(downloadSectionRegex, '').trim();
            }

            processedContent = processedContent.replace(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[vV]?\s*[\d.]+\s*(?:\r?\n|$)/i, '').trim();
            setReadmeContent(resolveReferences(processedContent));

            const versionMatch = text.match(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[vV]?\s*([\d.]+)/i);
            if (versionMatch) setVersion(versionMatch[1]);
        };

        if (localContent) {
            processText(localContent);
            setLoading(false);
        } else if (readmeUrl) {
            setLoading(true);
            const cacheBustUrl = `${readmeUrl}?t=${new Date().getTime()}`;
            fetch(cacheBustUrl, { cache: 'no-store' })
                .then((res) => res.text())
                .then((text) => {
                    processText(text);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch readme:", err);
                    setLoading(false);
                });
        }
    }, [readmeUrl, localContent, i18n.language, id, isProduct, isService, isCourse]);

    return {
        readmeContent,
        overviewContent,
        titleContent,
        shortDesc,
        longDesc,
        pricingContent,
        portfolioContent,
        featuresContent,
        termsContent,
        collaborationContent,
        courseContent,
        statsContent,
        loading,
        version,
        isPaid,
        encryptionDownloadUrl,
        playerDownloadUrl,
        tutorialsUrl,
        buttons
    };
};
