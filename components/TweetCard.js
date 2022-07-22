import { Tooltip } from "@chakra-ui/tooltip";
import { useSession } from "next-auth/react";
import {
  DotsHorizontalIcon,
  HeartIcon,
  SwitchVerticalIcon,
  ChatIcon,
  ShareIcon,
  TrashIcon,
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
import { db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, tweetIdState } from "../atom/modalAtom";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TweetCard({ tweet, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  // Recoil State
  const [open, setOpen] = useRecoilState(modalState);
  const [tweetId, setTweetId] = useRecoilState(tweetIdState);
  const router = useRouter();

  // get the likes
  useEffect(() => {
    onSnapshot(collection(db, "tweets", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db]);

  // get the comments
  useEffect(() => {
    onSnapshot(collection(db, "tweets", id, "comments"), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, [db]);

  // It will render when like button triggers
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  // likes.findIndex((like) => console.log(`like: ${like.id}`));

  const likeTweet = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "tweets", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "tweets", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const deleteTweet = async () => {
    await deleteDoc(doc(db, "tweets", id));
    if (tweet?.image) {
      deleteObject(ref(storage, `tweets/${id}/image`));
    }
  };

  return (
    <div className="py-5 border border-gray-100 hover:bg-gray-100/75 transition duration-300 px-3">
      <div className="flex items-start gap-x-3">
        <img src={tweet?.userImage} alt="user" className="w-12 h-12  rounded-full" />
        <div className="flex flex-1 flex-col gap-y-3">
          {/* Description */}
          <div className="flex justify-between">
            <div className="flex items-center gap-x-1.5">
              <h4 className="font-bold capitalize text-lg">{tweet?.name}</h4>
              <span className="text-gray-500">@{tweet?.username}.</span>
              <Moment fromNow>{tweet?.timestamp?.toDate()}</Moment>
            </div>
            <DotsHorizontalIcon className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300" />
          </div>
          {/* Image */}
          <p onClick={() => router.push(`/tweet/${id}`)} className="cursor-pointer">
            {tweet?.content}
          </p>
          <img
            onClick={() => router.push(`/tweet/${id}`)}
            src={tweet?.image}
            alt=""
            className="object-cover rounded-lg mt-3 cursor-pointer"
          />

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Tooltip label="Reply" fontSize="x-small">
                <ChatIcon
                  onClick={() => {
                    setTweetId(id);
                    setOpen(!open);
                  }}
                  className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300"
                />
              </Tooltip>

              {comments.length > 0 && (
                <span className="text-sm">{comments.length}</span>
              )}
            </div>

            {tweet?.uid === session?.user.uid && (
              <Tooltip label="Delete" fontSize="x-small">
                <TrashIcon
                  onClick={deleteTweet}
                  className="w-9 h-9 p-1.5 hover:bg-red-500/10 rounded-full cursor-pointer text-gray-500 hover:text-red-500/60 transition duration-300"
                />
              </Tooltip>
            )}

            <Tooltip label="Retweet" fontSize="x-small">
              <SwitchVerticalIcon className="w-9 h-9 p-1.5 hover:bg-green-500/10 rounded-full cursor-pointer text-gray-500 hover:text-green-500/60 transition duration-300" />
            </Tooltip>

            {/* Like Unlike Button */}
            <div className="flex items-center">
              {hasLiked ? (
                <Tooltip label="Unlike" fontSize="x-small">
                  <HeartIconFilled
                    onClick={likeTweet}
                    className="w-9 h-9 p-1.5 hover:bg-red-500/10 rounded-full cursor-pointer text-red-500 hover:text-red-500/60 transition duration-300"
                  />
                </Tooltip>
              ) : (
                <Tooltip label="Like" fontSize="x-small">
                  <HeartIcon
                    onClick={likeTweet}
                    className="w-9 h-9 p-1.5 hover:bg-red-500/10 rounded-full cursor-pointer text-gray-500 hover:text-red-500/60 transition duration-300"
                  />
                </Tooltip>
              )}

              {likes.length > 0 && (
                <span className={hasLiked ? "text-red-500 text-sm" : "text-sm"}>
                  {likes.length}
                </span>
              )}
            </div>

            <Tooltip label="Share" fontSize="x-small">
              <ShareIcon className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
