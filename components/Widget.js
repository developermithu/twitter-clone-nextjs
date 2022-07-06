import { SearchIcon } from "@heroicons/react/outline";
import React from "react";

export default function Widget() {
  return (
    <div className="col-span-2 hidden lg:inline ml-6">
      <div className="flex gap-x-2 items-center bg-gray-200 p-3 rounded-full ">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search twitter.."
          className=" bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
