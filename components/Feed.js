import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetForm from "../components/TweetForm";
import TweetBox from "../components/TweetBox";

export default function TweetFeed() {
  return (
    <div className="col-span-9 lg:col-span-6 border border-t-0">
      <div className="flex items-center justify-between border-b pb-3 sticky top-1 z-50 px-3">
        <h1 className="text-xl font-bold">Home</h1>
        <RefreshIcon className="h-8 text-twitter transition-all duration-500 hover:rotate-180 hover:scale-125 cursor-pointer" />
      </div>

      {/* Tweet Form */}
      <div className="px-3 pb-3">
        <TweetForm />
      </div>

      {/* Tweet Box */}
      <div className="py-5 border px-3">
        <TweetBox />
      </div>
    </div>
  );
}
