import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import BlenderCourse from "./courses/BlenderCourse";
import BlenderFreeExtCourse from "./courses/BlenderFreeExtCourse";
import D5RenderFreeCourse from "./courses/D5RenderFreeCourse";
import BlenderFreeIntCourse from "./courses/BlenderFreeIntCourse";

const CourseDetail = () => {
  const { id } = useParams();

  switch (id) {
    case "blender":
      return <BlenderCourse />;
    case "blender-free-ext":
      return <BlenderFreeExtCourse />;
    case "d5-render-free":
      return <D5RenderFreeCourse />;
    case "blender-free-int":
      return <BlenderFreeIntCourse />;
    default:
      return <NotFound />;
  }
};

export default CourseDetail;
