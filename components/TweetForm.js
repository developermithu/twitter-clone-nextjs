import {
  PhotographIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";

export default function TweetForm() {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  // Add a new document with a generated id.
  const createTweet = async () => {
    setLoading(true);

    const docRef = await addDoc(collection(db, "tweets"), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      userEmail: session.user.email, // unique field
      userImage: session.user.image,
      content: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `tweets/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "tweets", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
    toast("Tweet posted!", {
      icon: "🚀",
    });
  };

  const addImageToTweet = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      // console.log(readerEvent.target.result);
    };
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-x-4 items-start mt-5">
        {session ? (
          <Image
            src={session.user.image}
            width={48}
            height={48}
            alt={session.user.name}
            className="rounded-full"
          />
        ) : (
          <img
            src="http://sanjaymotels.com/wp-content/uploads/2019/01/testimony.png"
            alt="avatar"
            className="w-12 h-12"
          />
        )}

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

            {selectedFile && (
              <div className="py-5 relative">
                <XCircleIcon
                  onClick={() => setSelectedFile(null)}
                  className="absolute w-9 h-9 top-7 left-2 fill-red text-red-500 hover:scale-110 transition duration-300 cursor-pointer"
                />
                <img
                  src={selectedFile}
                  alt=""
                  className={loading && "animate-pulse"}
                />
              </div>
            )}
          </form>

          {/* Icon field */}
          <div className="flex items-center justify-between">
            {/* Emoji Icons */}
            <div className="flex items-center gap-x-4">
              <div onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className="w-6 h-6 hover:scale-125 transition duration-300 ease-out text-twitter cursor-pointer" />
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToTweet}
                />
              </div>
              <EmojiHappyIcon className="w-6 h-6 hover:scale-125 transition duration-300 ease-out text-twitter cursor-pointer" />
              <LocationMarkerIcon className="w-6 h-6 hover:scale-125 transition duration-300 ease-out text-twitter cursor-pointer" />
            </div>

            {/* Tweet Button */}
            <button
              onClick={session ? createTweet : () => signIn()}
              disabled={!input.trim() || loading}
              className="px-5 py-2 rounded-full bg-twitter hover:opacity-90 disabled:opacity-40 font-bold text-white"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
