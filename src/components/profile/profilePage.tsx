import { Home, Clock, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";

interface ProfilePageProps {
  user: {
    name: string;
    username: string;
    points: number;
    avatar: string;
  };
}

export default function ProfilePage({ user } : {user: User}) {
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
      <Tabs defaultValue="videos" className="w-full">
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
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-800 rounded-lg" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-800 rounded-lg" />
            ))}
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
