import VideoFeed from "./components/videoFeed";
import { ScreenContext } from "./context/ScreenContext";
import OnBoard from "./components/onBoard";
import { useContext} from "react";
export default function App() {
  const { currentScreen } = useContext(ScreenContext);
 
    return (
      <div>
    {currentScreen === 'onboarding' && <OnBoard/>}
       {currentScreen === 'videofeed' && <VideoFeed/>}
     </div>
      
  )
}
