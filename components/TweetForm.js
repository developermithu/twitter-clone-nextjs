import {
  PhotographIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function TweetForm() {
  const [input, setInput] = useState("");
  const { data: session } = useSession();

  return (
    <div className="flex gap-x-4 items-start mt-5">
      <Image
        src={session.user.image}
        width={48}
        height={48}
        alt={session.user.name}
      />

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
