import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./NotFound";

const CourseDetail = () => {
  const { id } = useParams();

  if (!id) return <NotFound />;

  try {
    const CourseComponent = lazy(() => import(`./courses/${id}/index.tsx`));
    
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>}>
        <CourseComponent />
      </Suspense>
    );
  } catch {
    return <NotFound />;
  }
};

export default CourseDetail;
