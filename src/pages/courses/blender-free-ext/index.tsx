import FreeYoutubeCourse from "../FreeYoutubeCourse";
import localReadme from "./content.md?raw";
const icon = new URL("./icon.png", import.meta.url).href;

const BlenderFreeExtCourse = () => {
    return (
        <FreeYoutubeCourse
            id="blender-free-ext"
            icon={icon}
            markdownContent={localReadme}
            youtubeLink="https://www.youtube.com/embed/uEdqVQMEgsY?list=PLRrETGQR_7qKfKqwz4oBB_DGsLs87pGcy"
            playlistLink="https://www.youtube.com/watch?v=uEdqVQMEgsY&list=PLRrETGQR_7qKfKqwz4oBB_DGsLs87pGcy"
        />
    );
};

export default BlenderFreeExtCourse;
