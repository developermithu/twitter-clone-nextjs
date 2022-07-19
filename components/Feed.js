import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetForm from "../components/TweetForm";
import TweetCard from "../components/TweetCard";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function TweetFeed() {
  const router = useRouter();
  const [tweets, setTweets] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "tweets"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setTweets(snapshot.docs);
        }
      ),
    []
  );
  // console.log(tweets);

  const showToaster = () => {
    router.push("/");
    toast("Refreshed!", {
      icon: "🚀",
    });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-span-9 lg:col-span-6 border border-gray-100 border-t-0">
        <div className="flex items-center justify-between border-b pb-3 sticky top-0 pt-1.5 z-50 px-3 bg-white">
          <h1 className="text-xl font-bold">Home</h1>
          <RefreshIcon
            onClick={showToaster}
            className="h-7 text-twitter transition-all duration-500 hover:rotate-180 hover:scale-125 cursor-pointer"
          />
        </div>

        {/* Tweet Form */}
        <div className="px-3 pb-3">
          <TweetForm />
        </div>

        {/* Tweet Box */}
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="py-5 border border-gray-100 hover:bg-gray-100/75 transition duration-300 cursor-pointer px-3"
          >
            <TweetCard id={tweet.id} tweet={tweet} />
          </div>
        ))}
      </div>
    </>
  );
}
