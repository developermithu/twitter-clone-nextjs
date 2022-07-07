import { DotsHorizontalIcon, HeartIcon } from "@heroicons/react/outline";

export default function TweetBox() {
  return (
    <div className="flex items-start justify-between gap-x-3">
      <img src="/developermithu.png" alt="user" className="w-12 h-12" />
      <div className="flex flex-col gap-y-3">
        {/* Description */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-1.5">
            <h4 className="font-bold capitalize">Mithu Das</h4>
            <span className="text-gray-500">@developermithu.</span>
            <span>3 hours ago</span>
          </div>
          <DotsHorizontalIcon className="w-6 h-6 hover:bg-twitter/20 rounded-full cursor-pointer" />
        </div>
        {/* Image */}
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            facere quod dolor soluta temporibus quam fugit, atque enim. Quas Lorem ipsum dolor sit amet...
            </p>
          <img
            src="https://cdn.pixabay.com/photo/2021/11/25/12/47/tulips-6823523_960_720.jpg"
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
