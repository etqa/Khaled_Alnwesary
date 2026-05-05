import { useState, useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface ItemLogoProps {
    src?: string;
    imageName?: string;
    category?: string;
    itemId?: string;
    fallbackIcon?: LucideIcon;
    className?: string;
    iconClassName?: string;
}

export const ItemLogo = ({ src: directSrc, imageName, category, itemId, fallbackIcon: Icon, className, iconClassName }: ItemLogoProps) => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [extIndex, setExtIndex] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const extensions = ['.png', '.svg', '.jpg', '.jpeg', '.webp'];

    const currentExt = extensions[extIndex];
    
    // If directSrc is provided, use it. Otherwise, try constructing paths with different extensions.
    const src = directSrc || ((category && itemId) 
        ? `${import.meta.env.BASE_URL}images/${category}/${itemId}/icon${currentExt}`
        : `${import.meta.env.BASE_URL}images/icons/${imageName}${currentExt}`);

    const handleError = () => {
        // If we have a direct source and it fails, don't try extensions, just error.
        if (directSrc) {
            setStatus('error');
            return;
        }

        if (extIndex < extensions.length - 1) {
            setExtIndex(prev => prev + 1);
        } else {
            setStatus('error');
        }
    };

    useEffect(() => {
        setStatus('loading');
        setExtIndex(0);
        
        // If the image is already cached and complete, set to success immediately
        if (imgRef.current && imgRef.current.complete) {
            setStatus('success');
        }
    }, [imageName, category, itemId, directSrc]);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {status !== 'error' && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={imageName || itemId || "Logo"}
                    className={`${className} ${status === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    onLoad={() => setStatus('success')}
                    onError={handleError}
                />
            )}
            
            {status !== 'success' && Icon && (
                <div className="flex items-center justify-center w-full h-full absolute inset-0">
                    <Icon className={`${iconClassName} ${status === 'loading' ? 'animate-pulse' : ''}`} />
                </div>
            )}
        </div>
    );
};
