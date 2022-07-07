import {
  HomeIcon,
  HashtagIcon,
  UsersIcon,
  BellIcon,
  BookmarkIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SideBarItem from "./SideBarItem";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function SideBar() {
  const { data: session } = useSession();

  return (
    <div className=" col-span-3 flex flex-col items-center md:items-start gap-y-2 mr-6">
      {/* Twitter Logo */}
      <div className="pl-0 md:pl-4">
        <svg
          className="fill-twitter h-9"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </div>

      {/* Sidebar Item */}
      <SideBarItem text="Home" Icon={HomeIcon} />
      <SideBarItem text="Explore" Icon={HashtagIcon} />
      <SideBarItem text="Communities" Icon={UsersIcon} />
      <SideBarItem text="Notifications" Icon={BellIcon} />
      <SideBarItem text="Messages" Icon={InboxIcon} />
      <SideBarItem text="Bookmark" Icon={BookmarkIcon} />
      <SideBarItem text="Profile" Icon={UserIcon} />
      <SideBarItem text="More" Icon={DotsCircleHorizontalIcon} />

      {/* Button */}
      <button className="block w-full rounded-full py-3 text-lg text-white font-bold bg-twitter hover:opacity-90">
        Tweet
      </button>

      {/* User Profile */}
      <div
        onClick={() => signOut()}
        className="flex items-center gap-x-3.5 hover:bg-gray-200 cursor-pointer px-4 py-3 rounded-full transition-all duration-200 mt-10"
      >
        <Image src={session.user.image} width={40} height={40} />
        <div className=" hidden lg:flex flex-col">
          <span className="font-bold capitalize">{session.user.name}</span> 
          <span className="text-sm">@DeveloperMithu</span>
        </div>
        <DotsHorizontalIcon className="h-5 hidden lg:inline" />
      </div>
    </div>
  );
}
