import FreeYoutubeCourse from "./FreeYoutubeCourse";
import localReadme from "./BlenderFreeExt.md?raw";

const BlenderFreeExtCourse = () => {
    return (
        <FreeYoutubeCourse
            id="blender-free-ext"
            markdownContent={localReadme}
            youtubeLink="https://www.youtube.com/embed/uEdqVQMEgsY?list=PLRrETGQR_7qKfKqwz4oBB_DGsLs87pGcy"
            playlistLink="https://www.youtube.com/watch?v=uEdqVQMEgsY&list=PLRrETGQR_7qKfKqwz4oBB_DGsLs87pGcy"
        />
    );
};

export default BlenderFreeExtCourse;
