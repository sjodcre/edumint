interface UserProfileProps {
  user: {
    username: string
    profileImage: string
    tier: string
    followers: number
    following: number
  }
  onClose: () => void
}

export function UserProfile({ user, onClose }: UserProfileProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={user.profileImage} 
              alt={user.username} 
              className="w-24 h-24 rounded-full"
            />
            <div className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {user.tier}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">@{user.username}</h3>
          <div className="flex space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold">{user.followers}</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.following}</p>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}

