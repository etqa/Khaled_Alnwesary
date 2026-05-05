import FreeYoutubeCourse from "../FreeYoutubeCourse";
import localReadme from "./content.md?raw";
const icon = new URL("./icon.png", import.meta.url).href;

const BlenderFreeIntCourse = () => {
    return (
        <FreeYoutubeCourse
            id="blender-free-int"
            icon={icon}
            markdownContent={localReadme}
            youtubeLink="https://www.youtube.com/embed/Zoj-oNpjmuM?list=PLRrETGQR_7qJNNscGsOBhzdgyZA2txeVS"
            playlistLink="https://www.youtube.com/watch?v=Zoj-oNpjmuM&list=PLRrETGQR_7qJNNscGsOBhzdgyZA2txeVS"
        />
    );
};

export default BlenderFreeIntCourse;
