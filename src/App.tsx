import VideoFeed from "./components/videoFeed";
import { ScreenContext } from "./context/ScreenContext";
import OnBoard from "./components/onBoard";
import { useContext } from "react";
import ProfilePage from "./components/profile/profilePage";
import { useArweaveProvider } from "./context/ProfileContext";
export default function App() {
  const { currentScreen } = useContext(ScreenContext);
  const {selectedUser} = useArweaveProvider()
  return (
    <div>
      {currentScreen === "onboarding" && <OnBoard />}
      {currentScreen === "videofeed" && <VideoFeed />}
      {currentScreen === "profile" && <ProfilePage user={selectedUser}/>}
    </div>
  );
}
