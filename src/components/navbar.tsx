import { Link } from "react-router-dom"
import { Home, PlusSquare, User } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <Link to="/feed" className="flex flex-col items-center text-gray-500 hover:text-black">
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      {/* <Link to="/discover" className="flex flex-col items-center text-gray-500 hover:text-black"> */}
      {/*   <Compass size={24} /> */}
      {/*   <span className="text-xs mt-1">Discover</span> */}
      {/* </Link> */}
      <Link to="/create" className="flex flex-col items-center text-gray-500 hover:text-black">
        <PlusSquare size={24} />
        <span className="text-xs mt-1">Create</span>
      </Link>
      {/* <Link to="/activity" className="flex flex-col items-center text-gray-500 hover:text-black"> */}
      {/*   <Heart size={24} /> */}
      {/*   <span className="text-xs mt-1">Activity</span> */}
      {/* </Link> */}
      <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-black">
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </nav>
  )
}

