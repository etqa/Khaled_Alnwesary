import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./NotFound";

const ServiceDetail = () => {
    const { id } = useParams();

    if (!id) return <NotFound />;

    // Map service IDs to folder names
    const serviceMap: Record<string, string> = {
        "exterior": "exterior-design",
        "interior": "interior-design",
        "virtual-tours": "virtual-tours",
        "animation": "animation"
    };

    const folderName = serviceMap[id];

    if (!folderName) return <NotFound />;

    try {
        const ServiceComponent = lazy(() => import(`./services/${folderName}/index.tsx`));
        
        return (
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>}>
                <ServiceComponent />
            </Suspense>
        );
    } catch {
        return <NotFound />;
    }
};

export default ServiceDetail;
