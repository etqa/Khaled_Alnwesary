import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./NotFound";

const FreeDetail = () => {
  const { id } = useParams();

  if (!id) return <NotFound />;

  try {
    const FreeComponent = lazy(() => import(`./free/${id}/index.tsx`));
    
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>}>
        <FreeComponent />
      </Suspense>
    );
  } catch {
    return <NotFound />;
  }
};

export default FreeDetail;
