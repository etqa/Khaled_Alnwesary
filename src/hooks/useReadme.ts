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
    const [loading, setLoading] = useState(false);
    const [version, setVersion] = useState<string | null>(null);
    const [encryptionDownloadUrl, setEncryptionDownloadUrl] = useState<string | null>(null);
    const [playerDownloadUrl, setPlayerDownloadUrl] = useState<string | null>(null);
    const [tutorialsUrl, setTutorialsUrl] = useState<string | null>(null);
    const [buttons, setButtons] = useState<{ label: string; url: string }[]>([]);

    // Product specific content
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
            const currentLang = i18n.language;
            let processedContent = text;

            // Remove HTML comments first to avoid matching commented out links
            processedContent = processedContent.replace(/<!--[\s\S]*?-->/g, '');

            const englishMarkers = [/##\s+English/i, /##\s+🌍\s+English/i, /##\s+English\s+🌍/i];
            const arabicMarkers = [/##\s+العربية/i, /##\s+|\s+العربية\s+🕌/i, /##\s+العربية\s+🕌/i, /##\s+العربية\s+\(Arabic\)/i];

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

            processedContent = processedContent.replace(/^(?:##\s+.*(?:\r?\n|$))/, '').trim();
            processedContent = processedContent.replace(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[\d.]+\s*(?:\r?\n|$)/i, '').trim();
            processedContent = processedContent.replace(/<a\s+name="[^"]*"><\/a>/gi, '').trim();
            processedContent = processedContent.replace(/^-{3,}\s*$/gm, '').trim();

            // Extract Sections
            const extractSection = (regex: RegExp) => {
                const match = processedContent.match(regex);
                if (match && match[1]) {
                    const content = match[1].trim();
                    processedContent = processedContent.replace(regex, '').trim();
                    return content;
                }
                return null;
            };

            // Overview
            const overview = extractSection(/(?:###\s+)(?:Overview|نظرة عامة)\s*(.*?)(?=###|$)/si);
            setOverviewContent(overview);

            // Pricing
            const pricing = extractSection(/(?:###\s+)(?:Pricing|Pricing Plans|الأسعار|خطط الأسعار)\s*(.*?)(?=###|$)/si);
            setPricingContent(pricing);

            // Buttons Section
            const buttonsSectionStr = extractSection(/(?:###\s+)(?:Buttons|الأزرار|الروابط|التحميلات|Links)\s*(.*?)(?=###|$)/si);
            if (buttonsSectionStr) {
                const buttonMatches = Array.from(buttonsSectionStr.matchAll(/\[(.*?)\]\((.*?)\)/g));
                const parsedButtons = buttonMatches.map(m => ({ label: m[1], url: m[2] }));
                setButtons(parsedButtons);
            } else {
                setButtons([]);
            }

            // Service specific sections
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

            // Course specific sections
            if (isCourse) {
                const course = extractSection(/(?:###\s+)(?:Course Content|محتوى الدورة)\s*(.*?)(?=###|$)/si);
                const stats = extractSection(/(?:###\s+)(?:Stats|الإحصائيات)\s*(.*?)(?=###|$)/si);
                const features = extractSection(/(?:###\s+)(?:Features|المميزات)\s*(.*?)(?=###|$)/si);

                setCourseContent(course);
                setStatsContent(stats);
                setFeaturesContent(features);
            }

            // Extract and remove sections (Tutorials & Download)
            const tutorialsSectionRegex = /(?:###\s+)(?:دروس تعليمية|Tutorials).*?(?=###|$)/si;
            const tutorialsMatch = processedContent.match(tutorialsSectionRegex);
            if (tutorialsMatch) {
                const urlMatch = tutorialsMatch[0].match(/(?:\[.*?\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s\r\n]+))/i);
                if (urlMatch) {
                    setTutorialsUrl(urlMatch[1] || urlMatch[2]);
                }
                processedContent = processedContent.replace(tutorialsSectionRegex, '').trim();
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
                    // For other items (like KHTools), find the first URL
                    const urlMatch = downloadMatch[0].match(/(?:\[.*?\]\((https?:\/\/[^\)]+)\)|(https?:\/\/[^\s\r\n]+))/i);
                    if (urlMatch) {
                        // We use encryptionDownloadUrl state to store the main download URL for generic items too
                        setEncryptionDownloadUrl(urlMatch[1] || urlMatch[2]);
                    }
                }

                // Remove the download section from the displayed content
                processedContent = processedContent.replace(downloadSectionRegex, '').trim();
            }

            // Also remove any stray version lines
            processedContent = processedContent.replace(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*[\d.]+\s*(?:\r?\n|$)/i, '').trim();

            setReadmeContent(processedContent);

            const versionMatch = text.match(/(?:\*\*Version:\*\*|\*\*الإصدار:\*\*)\s*([\d.]+)/i);
            if (versionMatch) {
                setVersion(versionMatch[1]);
            }
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
        pricingContent,
        portfolioContent,
        featuresContent,
        termsContent,
        collaborationContent,
        courseContent,
        statsContent,
        loading,
        version,
        encryptionDownloadUrl,
        playerDownloadUrl,
        tutorialsUrl,
        buttons
    };
};
