import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { dryrun } from "@permaweb/aoconnect";
import { useConnection } from "@arweave-wallet-kit/react";
import { useState, useEffect } from "react";
import { useArweaveProvider } from "@/context/ProfileContext";
import { processId } from "@/config/config";

export default function ProfilePage({ user } : {user: User}) {
  const { connected } = useConnection();
  const arProvider = useArweaveProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const fetchBookmarkedPosts = async () => {
    if (!connected) return;
    if (!arProvider.profile) return;
    setIsLoading(true);
    try {
      const response = await dryrun({
        process: processId,
        tags: [
          { name: "Action", value: "Get-Bookmarked-Posts" },
          { name: "Author-Id", value: arProvider.profile.walletAddress },
        ],
      });
      const parsedPosts = response.Messages.map((msg) => {
        const parsedData = JSON.parse(msg.Data);
      //   return parsedData;
      console.log("parsedPosts before mapping: ", parsedData);
      return parsedData.map((post: any) => ({
          ...post,
          LikeCount: post.LikeCount || 0, // Ensure LikeCount defaults to 0
          }));
      });
      console.log("parsedPosts after mapping: ", parsedPosts[0]);
      setBookmarkedPosts(parsedPosts[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    if (!connected) return;
    if (!arProvider.profile) return;
    setIsLoading(true);
    try {
      // console.log("user profile: ", arProvider.profile);
      const response = await dryrun({
        process: processId,
        // data: "",
        tags: [
          { name: "Action", value: "List-User-Posts" },
          { name: "Author-Id", value: arProvider.profile.walletAddress },
        ],
        // anchor: "latest"
      });
      // console.log("fetched user posts  before parsing: ", response);

      const parsedPosts = response.Messages.map((msg) => {
        const parsedData = JSON.parse(msg.Data);
        // return parsedData;
        return parsedData.map((post: any) => ({
          ...post,
          Liked: post.Liked === 1, // Convert Liked to boolean (if present)
          LikeCount: post.LikeCount || 0, // Ensure LikeCount defaults to 0
          SellingStatus: post.SellingStatus === 1, // Convert SellingStatus to boolean (if present)
        }));
      });
      console.log("fetched user posts: ", parsedPosts[0]);
      setUserPosts(parsedPosts[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "videos") {
      fetchUserPosts();
    } else if (activeTab === "saved") {
      fetchBookmarkedPosts();
    }
  }, [activeTab]);


  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-zinc-700">
            <AvatarImage src={user.profileImage} alt={user.displayName} />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold">{user.displayName}</h1>
            <p className="text-sm text-zinc-400">@{user.username}</p>
          </div>
          <div className="ml-auto">
          {/* user points */}
            <span className="text-sm">{100} points</span>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs defaultValue="videos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-zinc-800 p-0 h-12">
          <TabsTrigger
            value="videos"
            className="flex-1 data-[state=active]:bg-zinc-700 rounded-none"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="flex-1 data-[state=active]:bg-zinc-700 rounded-none"
          >
            Saved
          </TabsTrigger>
          <TabsTrigger
            value="sold"
            className="flex-1 data-[state=active]:bg-zinc-700 rounded-none"
          >
            Sold
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-800 rounded-lg animate-pulse" />
              ))
            ) : userPosts.length > 0 ? (
              userPosts.map((post: any, i) => (
                <div key={i} className="flex flex-col">
                  <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                    <video 
                      src={`https://arweave.net/${post.VideoTxId}`}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                  <p className="mt-2 text-sm text-center truncate">{post.Title}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-zinc-500">No videos found</div>
            )}

          </div>
        </TabsContent>
        <TabsContent value="saved" className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-800 rounded-lg animate-pulse" />
              ))
            ) : bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post: any, i) => (
                <div key={i} className="flex flex-col">
                  <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                    <video 
                      src={`https://arweave.net/${post.VideoTxId}`}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                  <p className="mt-2 text-sm text-center truncate">{post.Title}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-zinc-500">No saved videos found</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="sold" className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-800 rounded-lg" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
