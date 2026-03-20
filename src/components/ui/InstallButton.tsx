import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallButton = () => {
  const { t, i18n } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    setIsStandalone(isInStandaloneMode);

    // Detect iOS devices
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent);
    setIsIOS(iOS || isMac);

    // Show button if not installed
    if (!isInStandaloneMode) {
      setShowInstallButton(true);
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, Samsung Internet)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // For iOS/Mac devices, show instructions dialog
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    // For Android/Windows with prompt support
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        setShowInstallButton(false);
      }
      
      setDeferredPrompt(null);
    }
  };

  // Don't show button if already installed
  if (isStandalone || !showInstallButton) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleInstallClick}
        className="h-9 w-9 p-0 rounded-full hover:bg-muted relative group transition-all duration-300"
        title={t("install.button_title", "تثبيت التطبيق")}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
          <Download className="h-4 w-4" />
        </div>
        <span className="sr-only">{t("install.button_title", "تثبيت التطبيق")}</span>
      </Button>

      {/* iOS/Mac Installation Instructions Dialog */}
      <Dialog open={showIOSInstructions} onOpenChange={setShowIOSInstructions}>
        <DialogContent className="sm:max-w-md" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {t("install.ios_title", "تثبيت التطبيق")}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIOSInstructions(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription className="text-right" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              {i18n.language === "ar" ? (
                <div className="space-y-4 text-foreground">
                  <p className="font-semibold">لتثبيت التطبيق على جهاز آيفون أو ماك:</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>اضغط على زر المشاركة <span className="inline-block">📤</span> في شريط المتصفح</li>
                    <li>قم بالتمرير لأسفل واختر "إضافة إلى الشاشة الرئيسية" <span className="inline-block">➕</span></li>
                    <li>اضغط على "إضافة" في الزاوية العلوية</li>
                    <li>سيظهر التطبيق على الشاشة الرئيسية</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-4">
                    ملاحظة: يجب استخدام متصفح Safari لتثبيت التطبيق على أجهزة آبل
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-foreground">
                  <p className="font-semibold">To install the app on iPhone or Mac:</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Tap the Share button <span className="inline-block">📤</span> in the browser bar</li>
                    <li>Scroll down and select "Add to Home Screen" <span className="inline-block">➕</span></li>
                    <li>Tap "Add" in the top corner</li>
                    <li>The app will appear on your home screen</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-4">
                    Note: You must use Safari browser to install the app on Apple devices
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
