import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import KHTools from "./free/KHTools";
import QuranApp from "./free/QuranApp";
import TaskManager from "./free/TaskManager";

const FreeDetail = () => {
  const { id } = useParams();

  switch (id) {
    case "kh-tools":
      return <KHTools />;
    case "quran-app":
      return <QuranApp />;
    case "task-manager":
      return <TaskManager />;
    default:
      return <NotFound />;
  }
};

export default FreeDetail;
