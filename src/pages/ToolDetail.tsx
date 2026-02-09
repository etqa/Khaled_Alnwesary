import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import KHTools from "./tools/KHTools";
import QuranApp from "./tools/QuranApp";
import TaskManager from "./tools/TaskManager";

const ToolDetail = () => {
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

export default ToolDetail;
