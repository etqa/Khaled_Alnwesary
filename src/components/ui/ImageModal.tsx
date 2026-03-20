import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
    src: string;
    alt?: string;
    isOpen: boolean;
    onClose: () => void;
    images?: string[];
    currentIndex?: number;
    onNavigate?: (direction: 'prev' | 'next') => void;
}

export const ImageModal = ({ 
    src, 
    alt, 
    isOpen, 
    onClose, 
    images = [], 
    currentIndex = 0,
    onNavigate 
}: ImageModalProps) => {
    const [zoom, setZoom] = React.useState(1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const hasMultipleImages = images.length > 1;
    const showNavigation = hasMultipleImages && onNavigate;

    React.useEffect(() => {
        if (!isOpen) {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(prev => {
            const newZoom = Math.max(1, Math.min(prev + delta, 3));
            if (newZoom === 1) {
                setPosition({ x: 0, y: 0 });
            }
            return newZoom;
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoom > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handlePrevious = () => {
        if (onNavigate) {
            onNavigate('prev');
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleNext = () => {
        if (onNavigate) {
            onNavigate('next');
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black animate-in fade-in duration-300" />
                <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center animate-in zoom-in-95 duration-300">
                    <div 
                        className="relative w-full h-full flex items-center justify-center overflow-hidden"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onWheel={handleWheel}
                    >
                        <img
                            src={src}
                            alt={alt || "Image Preview"}
                            className="w-full h-full object-contain transition-transform duration-200"
                            style={{
                                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                            }}
                            draggable={false}
                        />

                        {/* Close Button */}
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={onClose}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        {showNavigation && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all duration-300"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all duration-300"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Image Counter & Description */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <div className="max-w-3xl mx-auto text-center">
                                {hasMultipleImages && (
                                    <div className="mb-3">
                                        <span className="inline-block px-4 py-2 rounded-full bg-primary/30 backdrop-blur-sm text-white font-bold text-sm">
                                            {currentIndex + 1}/{images.length}
                                        </span>
                                    </div>
                                )}
                                {alt && (
                                    <>
                                        <p className="text-white text-lg md:text-xl font-bold tracking-wide drop-shadow-lg animate-fade-up">
                                            {alt}
                                        </p>
                                        <div className="h-1 w-12 bg-primary mx-auto mt-3 rounded-full shadow-glow"></div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
