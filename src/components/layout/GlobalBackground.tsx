import { useTranslation } from "react-i18next";

export const GlobalBackground = () => {
    const { i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    return (
        <div className="fixed inset-0 min-h-screen bg-background geometric-pattern -z-50 pointer-events-none">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
                    style={{ [isRtl ? 'left' : 'right']: '25%' }}
                />
                <div
                    className="absolute bottom-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
                    style={{
                        [isRtl ? 'right' : 'left']: '25%',
                        animationDelay: "-3s"
                    }}
                />
            </div>

            {/* Bottom Gradient Overlay to ensure text readability if needed */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
    );
};
