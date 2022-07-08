import { DotsHorizontalIcon, HeartIcon } from "@heroicons/react/outline";
import Moment from "react-moment";

export default function TweetBox({ tweet }) {
  return (
    <div className="flex items-start justify-between gap-x-3">
      <img src={tweet.data().userImage} alt="user" className="w-12 h-12" />
      <div className="flex flex-col gap-y-3">
        {/* Description */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-1.5">
            <h4 className="font-bold capitalize">{tweet.data().name}</h4>
            <span className="text-gray-500">@developermithu.</span>
            <Moment fromNow>{tweet?.data()?.timestamp?.toDate()}</Moment>
          </div>
          <DotsHorizontalIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
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
          <HeartIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
          <HeartIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
          <HeartIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
          <HeartIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
          <HeartIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
