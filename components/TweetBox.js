import {
  PhotographIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function TweetBox() {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-x-4 items-start mt-5">
      <img src="/developermithu.png" alt="user img" className="w-12 h-12" />

      <div className="flex-1 flex-col">
        {/* form */}
        <form>
          <TextareaAutosize
            minRows={2}
            maxRows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            className="w-full outline-none text-xl"
          />
        </form>

        {/* Icon field */}
        <div className="flex items-center justify-between">
          {/* Emoji Icons */}
          <div className="flex items-center gap-x-4">
            <PhotographIcon className="w-6 h-6 hover:scale-125 transition duration-300 ease-out text-twitter cursor-pointer" />
            <EmojiHappyIcon className="w-6 h-6 hover:scale-125 transition duration-300 ease-out text-twitter cursor-pointer" />
            <LocationMarkerIcon className="w-6 h-6 hover:scale-125 transition duration-300 ease-out text-twitter cursor-pointer" />
          </div>

          {/* Tweet Button */}
          <button
            disabled={!input}
            className="px-5 py-2 rounded-full bg-twitter hover:opacity-90 disabled:opacity-40 font-bold text-white"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
