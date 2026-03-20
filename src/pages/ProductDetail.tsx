import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { id } = useParams();

  if (!id) return <NotFound />;

  try {
    const ProductComponent = lazy(() => import(`./products/${id}/index.tsx`));
    
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>}>
        <ProductComponent />
      </Suspense>
    );
  } catch {
    return <NotFound />;
  }
};

export default ProductDetail;
