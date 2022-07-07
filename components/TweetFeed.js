import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetBox from "./TweetBox";

export default function TweetFeed() {
  return (
    <div className="col-span-9 lg:col-span-6 border border-t-0 px-3">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-xl font-bold">Home</h1>
        <RefreshIcon className="h-8 text-twitter transition-all duration-500 hover:rotate-180 hover:scale-125 cursor-pointer" />
      </div>

      {/* Tweet Box */}
      <div>
        <TweetBox />
      </div>
    </div>
  );
}
