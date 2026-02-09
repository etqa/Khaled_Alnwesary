import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageModalProps {
    src: string;
    alt?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300" />
                <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 animate-in zoom-in-95 duration-300">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2.5rem]">
                        <img
                            src={src}
                            alt={alt || "Image Preview"}
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
                        />

                        {/* Controls */}
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={onClose}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Description / Caption Overlay */}
                        {alt && (
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <div className="max-w-3xl mx-auto text-center">
                                    <p className="text-white text-lg md:text-xl font-bold tracking-wide drop-shadow-lg animate-fade-up">
                                        {alt}
                                    </p>
                                    <div className="h-1 w-12 bg-primary mx-auto mt-3 rounded-full shadow-glow"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
