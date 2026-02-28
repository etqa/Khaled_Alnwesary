import FreeYoutubeCourse from "./FreeYoutubeCourse";
import localReadme from "./BlenderFreeInt.md?raw";

const BlenderFreeIntCourse = () => {
    return (
        <FreeYoutubeCourse
            id="blender-free-int"
            logoName="BlenderFreeInt"
            markdownContent={localReadme}
            youtubeLink="https://www.youtube.com/embed/Zoj-oNpjmuM?list=PLRrETGQR_7qJNNscGsOBhzdgyZA2txeVS"
            playlistLink="https://www.youtube.com/watch?v=Zoj-oNpjmuM&list=PLRrETGQR_7qJNNscGsOBhzdgyZA2txeVS"
        />
    );
};

export default BlenderFreeIntCourse;
