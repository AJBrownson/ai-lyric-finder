import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import LyricFinder from "../components/LyricFinder";


export default function Home() {
  return (
    <>
        <CopilotKit runtimeUrl="/api/copilotkit">
        <CopilotSidebar
          instructions={
            "Help the user search for lyrics for their favorite songs."
          }
          labels={{
            title: "Xi 👩",
            initial:
            "👋 Hi! I'm Xi, here to help you find lyrics for your favorite songs. Just type the song title and artist, and I'll get the lyrics for you.",
          }}
          defaultOpen={true}
          clickOutsideToClose={false}
        >
          <LyricFinder />
        </CopilotSidebar>
      </CopilotKit>
    </>
  );
}
