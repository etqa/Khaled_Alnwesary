import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface ButtonOption {
    label: string;
    url: string;
}

export interface ButtonItem {
    label: string;
    url: string;
    options?: ButtonOption[];
}

interface UseReadmeProps {
    readmeUrl?: string;
    id?: string;
    isProduct?: boolean;
    isService?: boolean;
    isCourse?: boolean;
    localContent?: string;
}

export const useReadme = ({ readmeUrl, id, isProduct, isService, isCourse, localContent }: UseReadmeProps) => {
    const { t, i18n } = useTranslation();
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
    const [buttons, setButtons] = useState<ButtonItem[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);

    const [isPaid, setIsPaid] = useState(false);
    const [isComingSoon, setIsComingSoon] = useState(false);
    const [typeLabel, setTypeLabel] = useState<string | null>(null);
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
            // 1. Extract and remove all Link Reference Definitions [id]: url "optional title"
            const linkRefs: Record<string, { url: string; title?: string }[]> = {};
            const lines = text.split(/\r?\n/);
            const cleanLines = lines.map(line => {
                const trimmed = line.trim();
                const m = trimmed.match(/^\[([^\]]+)\]:\s*(.*)$/i);
                if (m) {
                    const id = m[1].toLowerCase().trim();
                    let rawRest = m[2].trim();
                    let title: string | undefined = undefined;
                    const titleMatch = rawRest.match(/\s+["'](.*?)["']$/);
                    if (titleMatch) {
                        title = titleMatch[1].trim();
                        rawRest = rawRest.substring(0, titleMatch.index).trim();
                    }
                    const url = rawRest;
                    if (!linkRefs[id]) {
                        linkRefs[id] = [];
                    }
                    linkRefs[id].push({ url, title });
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

            // Extract and remove type (Paid/Free/Coming Soon)
            const typeMatch = text.match(/(?:\*\*Type:\*\*|\*\*النوع:\*\*)\s*([^\r\n]+)/i);
            if (typeMatch) {
                const rawType = typeMatch[1].trim();
                const typeLower = rawType.toLowerCase();
                const paid = typeLower.includes('paid') || typeLower.includes('مدفوع');
                const comingSoon = typeLower.includes('coming') || typeLower.includes('قريبا');

                setIsPaid(paid);
                setIsComingSoon(comingSoon);

                if (comingSoon) {
                    setTypeLabel(t("common.coming_soon"));
                } else if (paid) {
                    setTypeLabel(t("common.paid"));
                } else if (typeLower.includes('مجاني') || typeLower.includes('free')) {
                    setTypeLabel(t("common.free"));
                } else {
                    setTypeLabel(rawType);
                }
            } else {
                // Default logic for isCourse
                const defaultPaid = !!isCourse;
                setIsPaid(defaultPaid);
                setIsComingSoon(false);
                setTypeLabel(defaultPaid ? t("common.paid") : t("common.free"));
            }
            processedContent = processedContent.replace(/(?:\*\*Type:\*\*|\*\*النوع:\*\*)\s*([^\r\n]+)\s*(?:\r?\n|$)/i, '').trim();

            processedContent = processedContent.replace(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[vV]?\s*[\d.]+\s*(?:\r?\n|$)/i, '').trim();

            const platformMatch = text.match(/(?:\*\*المنصة:\*\*|\*\*المنصات:\*\*|\*\*Platform:\*\*)\s*(.*)/i);
            if (platformMatch) {
                const platformText = platformMatch[1].trim();
                // Match links [Label][ref], [Label](url) OR just [Label]
                const platformLinks = Array.from(platformText.matchAll(/\[([^\]]+)\](?:\[[^\]]+\]|\([^)]+\))?/g));
                if (platformLinks.length > 0) {
                    setPlatforms(platformLinks.map(m => m[1].trim()));
                } else {
                    // Fallback to comma/space separated
                    setPlatforms(platformText.split(/[,/|\s]+/).filter(p => p.trim().length > 0).map(p => p.trim()));
                }
            } else {
                setPlatforms([]);
            }
            processedContent = processedContent.replace(/(?:\*\*المنصة:\*\*|\*\*المنصات:\*\*|\*\*Platform:\*\*|\*\*متوافق مع:\*\*)\s*(.*)\s*(?:\r?\n|$)/i, '').trim();

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
                    const list = linkRefs[id.toLowerCase().trim()];
                    return list && list[0] ? `[${label}](${formatUrl(list[0].url)})` : match;
                });
                resolved = resolved.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, id) => {
                    const list = linkRefs[id.toLowerCase().trim()];
                    return list && list[0] ? `[${label}](${formatUrl(list[0].url)})` : match;
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

            const isArabic = currentLang === 'ar';

            const getSmartOptionLabel = (url: string, index: number) => {
                const lower = url.toLowerCase();
                if (lower.includes("play.google.com") || lower.includes("google.com/store")) {
                    return isArabic ? "متجر Google Play" : "Google Play Store";
                }
                if (lower.includes("apps.apple.com") || lower.includes("itunes.apple.com") || lower.includes("testflight")) {
                    return isArabic ? "متجر App Store" : "Apple App Store";
                }
                if (lower.includes("apps.microsoft.com") || lower.includes("microsoft.com/store")) {
                    return isArabic ? "متجر Microsoft Store" : "Microsoft Store";
                }
                if (
                    lower.includes("pcloud") ||
                    lower.includes("mediafire") ||
                    lower.includes("drive.google") ||
                    lower.includes("mega.nz") ||
                    lower.includes("dropbox") ||
                    lower.includes("github.com") ||
                    lower.endsWith(".apk") ||
                    lower.endsWith(".exe") ||
                    lower.endsWith(".zip") ||
                    lower.endsWith(".rar")
                ) {
                    return isArabic ? "تحميل مباشر" : "Direct Download";
                }
                return isArabic ? (index === 0 ? "تحميل مباشر" : `رابط إضافي ${index + 1}`) : (index === 0 ? "Direct Download" : `Link ${index + 1}`);
            };

            const resolveTargetLinks = (target?: string) => {
                if (!target) return [];
                const clean = target.trim();
                const lower = clean.toLowerCase();
                const list = linkRefs[lower];
                if (list && list.length > 0) {
                    return list.map(item => ({
                        url: formatUrl(item.url),
                        title: item.title
                    }));
                }

                if (/^(https?:\/\/|mailto:|tel:|#|whatsapp:)/i.test(clean) || clean.includes('.')) {
                    return [{ url: formatUrl(clean), title: undefined }];
                }

                return [];
            };

            const findSiblingEntries = (baseRefId: string) => {
                const lowerBase = baseRefId.toLowerCase().trim();
                const siblings: { key: string; url: string; title?: string }[] = [];
                for (const [key, list] of Object.entries(linkRefs)) {
                    if (key === lowerBase) continue;
                    if (key.startsWith(`${lowerBase}_`) || key.startsWith(`${lowerBase}-`)) {
                        list.forEach(item => siblings.push({ key, url: formatUrl(item.url), title: item.title }));
                    }
                }
                siblings.sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));
                return siblings;
            };

            const buttonsSectionStr = extractSection(/(?:###\s+)(?:Buttons|الأزرار|الروابط|التحميلات|Links)\s*(.*?)(?=###|$)/si);
            if (buttonsSectionStr) {
                const sectionLines = buttonsSectionStr
                    .split(/\r?\n/)
                    .filter(l => l.trim().length > 0 && !l.trim().startsWith('<!--'));

                const parsedButtons: ButtonItem[] = [];
                let currentParent: ButtonItem | null = null;

                for (let i = 0; i < sectionLines.length; i++) {
                    const rawLine = sectionLines[i];
                    const trimmed = rawLine.trim();
                    const isIndented = /^\s{2,}|\t/.test(rawLine);

                    const linkMatches = Array.from(trimmed.matchAll(/\[(.*?)\](?:\((.*?)\)|\[(.*?)\])?/g))
                        .filter(m => m[1] && m[1].trim().length > 0);

                    // Sub-item in nested list under currentParent
                    if (isIndented && currentParent) {
                        if (linkMatches.length > 0) {
                            const subM = linkMatches[0];
                            const subLabel = subM[1].trim();
                            const target = subM[3] !== undefined ? subM[3] : subM[2];
                            const resolved = resolveTargetLinks(target);
                            if (resolved.length > 0) {
                                if (!currentParent.options) {
                                    currentParent.options = [];
                                }
                                resolved.forEach(res => {
                                    currentParent!.options!.push({
                                        label: subLabel || res.title || getSmartOptionLabel(res.url, currentParent!.options!.length),
                                        url: res.url
                                    });
                                });
                            }
                        }
                        continue;
                    }

                    // Multi-link on single line
                    const linksWithUrls = linkMatches.filter(m => (m[2] !== undefined || m[3] !== undefined));
                    if (linkMatches.length >= 2 && linksWithUrls.length >= 2) {
                        const hasParentHeader = linkMatches[0][2] === undefined && linkMatches[0][3] === undefined;
                        const parentLabel = linkMatches[0][1].trim();
                        const subLinks = hasParentHeader ? linksWithUrls : linksWithUrls;

                        const options: ButtonOption[] = [];
                        subLinks.forEach((m) => {
                            const optLabel = m[1].trim();
                            const target = m[3] !== undefined ? m[3] : m[2];
                            const resolved = resolveTargetLinks(target);
                            resolved.forEach(res => {
                                options.push({
                                    label: optLabel || res.title || getSmartOptionLabel(res.url, options.length),
                                    url: res.url
                                });
                            });
                        });

                        const btn: ButtonItem = {
                            label: hasParentHeader ? parentLabel : linkMatches[0][1].trim(),
                            url: options[0]?.url || "",
                            options: options.length > 1 ? options : undefined
                        };
                        parsedButtons.push(btn);
                        currentParent = btn.options ? btn : null;
                        continue;
                    }

                    // Parent header for nested list (e.g. - [تحميل للاندرويد] or - تحميل للاندرويد:)
                    const parentHeaderMatch = trimmed.match(/^[-*]\s*(?:\[([^\]]+)\]|([^\s:][^:]*)):?\s*$/);
                    const nextLine = sectionLines[i + 1];
                    const nextIsIndented = nextLine && /^\s{2,}|\t/.test(nextLine);

                    if (nextIsIndented && parentHeaderMatch) {
                        const parentLabel = (parentHeaderMatch[1] || parentHeaderMatch[2]).trim();
                        const btn: ButtonItem = {
                            label: parentLabel,
                            url: "",
                            options: []
                        };
                        parsedButtons.push(btn);
                        currentParent = btn;
                        continue;
                    }

                    // Normal single link or ref line
                    if (linkMatches.length > 0) {
                        const m = linkMatches[0];
                        const label = m[1].trim();
                        const refOrUrl = m[3] !== undefined ? m[3] : m[2];
                        const primaryResolved = resolveTargetLinks(refOrUrl);

                        const siblings = refOrUrl ? findSiblingEntries(refOrUrl) : [];
                        const allOptions: ButtonOption[] = [];

                        primaryResolved.forEach((res, idx) => {
                            allOptions.push({
                                label: res.title || getSmartOptionLabel(res.url, idx),
                                url: res.url
                            });
                        });

                        siblings.forEach((sib) => {
                            allOptions.push({
                                label: sib.title || getSmartOptionLabel(sib.url, allOptions.length),
                                url: sib.url
                            });
                        });

                        const hasMultiple = allOptions.length > 1;

                        const btn: ButtonItem = {
                            label,
                            url: allOptions[0]?.url || (primaryResolved[0]?.url || ""),
                            options: hasMultiple ? allOptions : undefined
                        };
                        parsedButtons.push(btn);
                        currentParent = btn.options ? btn : null;
                        continue;
                    }

                    currentParent = null;
                }

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
        isComingSoon,
        typeLabel,
        encryptionDownloadUrl,
        playerDownloadUrl,
        tutorialsUrl,
        buttons,
        platforms
    };
};
