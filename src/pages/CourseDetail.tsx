import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import BlenderCourse from "./courses/BlenderCourse";

const CourseDetail = () => {
  const { id } = useParams();

  switch (id) {
    case "blender":
      return <BlenderCourse />;
    default:
      return <NotFound />;
  }
};

export default CourseDetail;
