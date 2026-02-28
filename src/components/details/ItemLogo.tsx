import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface ItemLogoProps {
    imageName: string;
    fallbackIcon?: LucideIcon;
    className?: string;
    iconClassName?: string;
}

export const ItemLogo = ({ imageName, fallbackIcon: Icon, className, iconClassName }: ItemLogoProps) => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [extIndex, setExtIndex] = useState(0);
    const extensions = ['.png', '.svg', '.jpg', '.jpeg', '.webp'];

    const currentExt = extensions[extIndex];
    const src = `${import.meta.env.BASE_URL}images/icons/${imageName}${currentExt}`;

    const handleError = () => {
        if (extIndex < extensions.length - 1) {
            setExtIndex(extIndex + 1);
        } else {
            setStatus('error');
        }
    };

    const handleLoad = () => {
        setStatus('success');
    };

    // If we have an icon but no imageName, show icon immediately
    if (!imageName && Icon) {
        return <Icon className={iconClassName} />;
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            {status !== 'error' && (
                <img
                    src={src}
                    alt={imageName}
                    className={`${className} ${status === 'loading' ? 'hidden' : 'block'}`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
            {status === 'error' && Icon && (
                <Icon className={iconClassName} />
            )}
            {status === 'loading' && Icon && (
                <Icon className={iconClassName} />
            )}
        </div>
    );
};
