import {
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchVerticalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Login from "./Login";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState, tweetIdState } from "../atom/modalAtom";
import { useSession } from "next-auth/react";
import { Tooltip } from "@chakra-ui/tooltip";

export default function Comment({ comment, commentId, originalTweetId }) {
  const { data: session } = useSession();

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [tweetId, setTweetId] = useRecoilState(tweetIdState);

  // get the tweet's comment like
  useEffect(() => {
    onSnapshot(
      collection(db, "tweets", originalTweetId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalTweetId, commentId]);

  // like & unlike functionality per user
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.email) !== -1
    );
  }, [likes]);

  // comment's like & unlike functionality
  const likeComment = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(
          db,
          "tweets",
          originalTweetId,
          "comments",
          commentId,
          "likes",
          session?.user.email
        )
      );
    } else {
      await setDoc(
        doc(
          db,
          "tweets",
          originalTweetId,
          "comments",
          commentId,
          "likes",
          session?.user.email
        ),
        {
          userName: session?.user.name,
        }
      );
    }
  };

  const deleteComment = async () => {
    await deleteDoc(doc(db, "tweets", originalTweetId, "comments", commentId));
  };

  // all conditional function have to write after useState & useEffect React Hooks function
  if (!session) return <Login />;

  return (
    <div className="py-5 border border-gray-100 hover:bg-gray-100/75 transition duration-300 cursor-pointer px-3 pl-16">
      <div className="flex items-start gap-x-3">
        <img
          src={comment?.userImage}
          alt="user"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-1 flex-col gap-y-3">
          {/* Description */}
          <div className="flex justify-between">
            <div className="flex items-center gap-x-1.5">
              <h4 className="font-bold capitalize">{comment?.userName}</h4>
              <span className="text-gray-500">{comment?.userEmail}</span>
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </div>
            <DotsHorizontalIcon className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300" />
          </div>
          {/* Image */}
          <p>{comment?.text}</p>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Tooltip label="Reply" fontSize="x-small">
                <ChatIcon
                  onClick={() => {
                    setTweetId(originalTweetId);
                    setOpen(!open);
                  }}
                  className="w-9 h-9 p-1.5 hover:bg-twitter/10 rounded-full cursor-pointer text-gray-500 hover:text-twitter/60 transition duration-300"
                />
              </Tooltip>
            </div>

            {comment?.userEmail === session?.user.email && (
              <Tooltip label="Delete" fontSize="x-small">
                <TrashIcon
                  onClick={deleteComment}
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
                    onClick={likeComment}
                    className="w-9 h-9 p-1.5 hover:bg-red-500/10 rounded-full cursor-pointer text-red-500 hover:text-red-500/60 transition duration-300"
                  />
                </Tooltip>
              ) : (
                <Tooltip label="Like" fontSize="x-small">
                  <HeartIcon
                    onClick={likeComment}
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
