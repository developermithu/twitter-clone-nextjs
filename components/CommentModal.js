import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { modalState, tweetIdState } from "../atom/modalAtom";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import ReactTextareaAutosize from "react-textarea-autosize";
import Router from "next/router";

export default function CommentModal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [tweetId] = useRecoilState(tweetIdState);
  const [tweet, setTweet] = useState({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = Router;

  // get the tweet by tweetId after clicking comment btn
  useEffect(() => {
    onSnapshot(doc(db, "tweets", tweetId), (snapshot) => {
      setTweet(snapshot.data());
    });
  }, [tweetId, db]);

  // create comment
  const createComment = async () => {
    setLoading(true);

    await addDoc(collection(db, "tweets", tweetId, "comments"), {
      text: input,
      userName: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setInput("");
    setLoading(false);
    router.push(`/tweet/${tweetId}`);
  };

  return (
    <div>
      {open && (
        <Modal size="xl" isOpen={open} onClose={() => setOpen(false)}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>

              <ModalBody>
                <div className="flex items-center gap-x-4 relative border-t mt-2">
                  <span className="w-0.5 bg-gray-200 h-full absolute left-6 top-16"></span>
                  <img
                    src={tweet?.userImage}
                    alt=""
                    className="object-cover rounded-full w-12 h-1/2 mt-3"
                  />
                  <h3 className="font-bold">{tweet?.userName}</h3>
                  <span className="text-sm">{tweet?.userEmail}.</span>
                  <Moment className="text-sm" fromNow>
                    {tweet?.timestamp?.toDate()}
                  </Moment>
                </div>
                <span className="ml-16">{tweet?.content}</span>
                <div className="flex items-center gap-x-5 mt-14">
                  <img
                    src={session?.user.image}
                    alt=""
                    className="object-cover rounded-full w-12 h-1/2 mt-3"
                  />
                  <form className="flex-1">
                    <ReactTextareaAutosize
                      minRows={2}
                      maxRows={10}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="What's your opinion?"
                      className="w-full outline-none text-xl"
                    />
                  </form>
                </div>
              </ModalBody>

              <ModalFooter>
                <button
                  onClick={createComment}
                  disabled={!input.trim() || loading}
                  className="px-5 py-2 rounded-full bg-twitter hover:opacity-90 disabled:opacity-40 font-bold text-white"
                >
                  Reply
                </button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </div>
  );
}
