import React from "react";

export default function RandomUserList({ user }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-x-1 hover:bg-gray-200 p-3 cursor-pointer transition duration-300">
        <div className="flex gap-x-3 items-center">
          <img
            src={user?.picture.thumbnail}
            alt=""
            className="w-9 h-9 rounded-full"
          />
          <div>
            <h3 className=" font-medium text-sm truncate">
              {user?.login.username}
            </h3>
            <p className="text-xs">{user?.name.first + " " + user.name.last}</p>
          </div>
        </div>

        <button className="px-3 py-1.5 rounded-full bg-black text-white font-semibold text-xs">
          Follow
        </button>
      </div>
    </div>
  );
}
