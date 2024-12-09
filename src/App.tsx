import VideoFeed from "./components/videoFeed";
import { ScreenContext } from "./context/ScreenContext";
import OnBoard from "./components/onBoard";
import { useContext } from "react";
import ProfilePage from "./components/profile/profilePage";
import { useArweaveProvider } from "./context/ProfileContext";
import { BottomNav, Navbar } from "./components/navbar";
export default function App() {
  const { currentScreen } = useContext(ScreenContext);
  const {selectedUser} = useArweaveProvider()
  return (
    <div>
      <Navbar/>
      {currentScreen === "onboarding" && <OnBoard />}
      {currentScreen === "videofeed" && <VideoFeed />}
      {currentScreen === "profile" && selectedUser && <ProfilePage user={selectedUser}/>}
      <BottomNav/>
    </div>
  );
}
