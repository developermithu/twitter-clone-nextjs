import { Tooltip } from "@chakra-ui/tooltip";
import { useSession } from "next-auth/react";
import {
  DotsHorizontalIcon,
  HeartIcon,
  SwitchVerticalIcon,
  ChatIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function TweetCard({ tweet }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets", tweet.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  // It will render when like button triggers
  useEffect(() => {
    // here like.id return email
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.email) !== -1
    );
  }, [likes]);

  // likes.findIndex((like) => console.log(`like: ${like.id}`));

  const likeTweet = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "tweets", tweet.id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "tweets", tweet.id, "likes", session.user.email), {
        username: session.user.name,
      });
    }
  };

  return (
    <div className="flex items-start gap-x-3">
      <img src={tweet.data().userImage} alt="user" className="w-12 h-12" />
      <div className="flex flex-1 flex-col gap-y-3">
        {/* Description */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-1.5">
            <h4 className="font-bold capitalize">{tweet.data().name}</h4>
            <span className="text-gray-500">@developermithu.</span>
            <Moment fromNow>{tweet?.data()?.timestamp?.toDate()}</Moment>
          </div>
          <DotsHorizontalIcon className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300" />
        </div>
        {/* Image */}
        <div>
          <p>{tweet.data().text}</p>
          <img
            src={tweet.data().image}
            alt=""
            className=" object-cover rounded-lg mt-3"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <Tooltip label="Reply" fontSize="smaller">
            <ChatIcon
              title="Reply"
              className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300"
            />
          </Tooltip>

          <Tooltip label="Retweet" fontSize="smaller">
            <SwitchVerticalIcon className="w-9 h-9 p-1.5 hover:bg-green-500/10 rounded-full cursor-pointer text-gray-500 hover:text-green-500/60 transition duration-300" />
          </Tooltip>

          {/* Like Unlike Button */}
          <div className="flex items-center">
            {hasLiked ? (
              <Tooltip label="Unlike" fontSize="smaller">
                <HeartIconFilled
                  onClick={likeTweet}
                  className="w-9 h-9 p-1.5 hover:bg-red-500/10 rounded-full cursor-pointer text-red-500 hover:text-red-500/60 transition duration-300"
                />
              </Tooltip>
            ) : (
              <Tooltip label="Like" fontSize="smaller">
                <HeartIcon
                  onClick={likeTweet}
                  className="w-9 h-9 p-1.5 hover:bg-red-500/10 rounded-full cursor-pointer text-gray-500 hover:text-red-500/60 transition duration-300"
                />
              </Tooltip>
            )}

            {likes.length > 0 && (
              <span className={hasLiked ? "text-red-500" : ""}>
                {likes.length}
              </span>
            )}
          </div>

          <Tooltip label="Share" fontSize="smaller">
            <ShareIcon className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
