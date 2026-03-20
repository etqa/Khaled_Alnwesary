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
    const [lastTouchDistance, setLastTouchDistance] = React.useState(0);
    const [lastTap, setLastTap] = React.useState(0);

    const hasMultipleImages = images.length > 1;
    const showNavigation = hasMultipleImages && onNavigate;

    React.useEffect(() => {
        if (!isOpen) {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen]);

    // Double click/tap to zoom
    const handleDoubleClick = (e: React.MouseEvent) => {
        if (zoom === 1) {
            // Zoom in to 2x at click position
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            setZoom(2);
            setPosition({ x: -x, y: -y });
        } else {
            // Zoom out to original
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleDoubleTap = (e: React.TouchEvent) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        
        if (now - lastTap < DOUBLE_TAP_DELAY) {
            e.preventDefault();
            if (zoom === 1) {
                // Zoom in to 2x at tap position
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.changedTouches[0];
                const x = touch.clientX - rect.left - rect.width / 2;
                const y = touch.clientY - rect.top - rect.height / 2;
                setZoom(2);
                setPosition({ x: -x, y: -y });
            } else {
                // Zoom out to original
                setZoom(1);
                setPosition({ x: 0, y: 0 });
            }
            setLastTap(0);
        } else {
            setLastTap(now);
        }
    };

    // Desktop: Mouse wheel zoom
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

    // Desktop: Mouse drag
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

    // Mobile: Touch events
    const getTouchDistance = (touches: React.TouchList) => {
        if (touches.length < 2) return 0;
        const touch1 = touches[0];
        const touch2 = touches[1];
        return Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            // Pinch zoom
            const distance = getTouchDistance(e.touches);
            setLastTouchDistance(distance);
        } else if (e.touches.length === 1) {
            // Check for double tap
            handleDoubleTap(e);
            
            // Single touch drag (only if zoomed)
            if (zoom > 1) {
                setIsDragging(true);
                setDragStart({
                    x: e.touches[0].clientX - position.x,
                    y: e.touches[0].clientY - position.y
                });
            }
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            // Pinch zoom
            e.preventDefault();
            const distance = getTouchDistance(e.touches);
            if (lastTouchDistance > 0) {
                const delta = (distance - lastTouchDistance) * 0.01;
                setZoom(prev => {
                    const newZoom = Math.max(1, Math.min(prev + delta, 3));
                    if (newZoom === 1) {
                        setPosition({ x: 0, y: 0 });
                    }
                    return newZoom;
                });
            }
            setLastTouchDistance(distance);
        } else if (e.touches.length === 1 && isDragging && zoom > 1) {
            // Single touch drag
            e.preventDefault();
            setPosition({
                x: e.touches[0].clientX - dragStart.x,
                y: e.touches[0].clientY - dragStart.y
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setLastTouchDistance(0);
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
                        className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                        onWheel={handleWheel}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <img
                            src={src}
                            alt={alt || "Image Preview"}
                            className="w-full h-full object-contain select-none"
                            style={{
                                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
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

                        {/* Navigation Buttons - Desktop */}
                        {showNavigation && (
                            <>
                                <button
                                    onClick={handleNext}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 max-md:hidden z-10 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm text-white shadow-xl hover:bg-primary/30 hover:scale-110 active:scale-95 transition-all duration-300"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 max-md:hidden z-10 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm text-white shadow-xl hover:bg-primary/30 hover:scale-110 active:scale-95 transition-all duration-300"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Image Counter & Description */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <div className="max-w-3xl mx-auto text-center">
                                {hasMultipleImages && (
                                    <div className="mb-3 flex items-center justify-center gap-4">
                                        {/* Mobile Navigation Buttons */}
                                        <button
                                            onClick={handlePrevious}
                                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm text-white shadow-xl hover:bg-primary/30 active:scale-95 transition-all duration-300"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        
                                        <span className="inline-block px-4 py-2 rounded-full bg-primary/30 backdrop-blur-sm text-white font-bold text-sm">
                                            {currentIndex + 1}/{images.length}
                                        </span>
                                        
                                        {/* Mobile Navigation Buttons */}
                                        <button
                                            onClick={handleNext}
                                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm text-white shadow-xl hover:bg-primary/30 active:scale-95 transition-all duration-300"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
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
