import FreeYoutubeCourse from "../FreeYoutubeCourse";
import localReadme from "./content.md?raw";
const icon = new URL("./icon.png", import.meta.url).href;

const D5RenderFreeCourse = () => {
    return (
        <FreeYoutubeCourse
            id="d5-render-free"
            icon={icon}
            markdownContent={localReadme}
            youtubeLink="https://www.youtube.com/embed/t8hTz0cuoY4?list=PLRrETGQR_7qKu5g6KTeKUHcdGZOc6uPZn"
            playlistLink="https://www.youtube.com/watch?v=t8hTz0cuoY4&list=PLRrETGQR_7qKu5g6KTeKUHcdGZOc6uPZn"
        />
    );
};

export default D5RenderFreeCourse;
