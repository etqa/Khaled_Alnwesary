import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import ExteriorDesign from "@/pages/services/ExteriorDesign";
import InteriorDesign from "@/pages/services/InteriorDesign";
import VirtualTours from "@/pages/services/VirtualTours";
import Animation from "@/pages/services/Animation";

const ServiceDetail = () => {
    const { id } = useParams();

    switch (id) {
        case "exterior":
            return <ExteriorDesign />;
        case "interior":
            return <InteriorDesign />;
        case "virtual-tours":
            return <VirtualTours />;
        case "animation":
            return <Animation />;
        default:
            return <NotFound />;
    }
};

export default ServiceDetail;
