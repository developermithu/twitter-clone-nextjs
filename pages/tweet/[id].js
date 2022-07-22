import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import SideBar from "../../components/SideBar";
import Widget from "../../components/Widget";
import CommentModal from "../../components/CommentModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import TweetCard from "../../components/TweetCard";
import { AnimatePresence, motion } from "framer-motion";
import Comment from "../../components/Comment";
import Login from "../../components/Login";

export default function TweetPage({ newsResults, randomUsers }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const [tweet, setTweet] = useState();
  const [comments, setComments] = useState([]);

  // get the post data
  useEffect(
    () =>
      onSnapshot(doc(db, "tweets", id), (snapshot) =>
        setTweet(snapshot.data())
      ),
    [db, id]
  );

  // get comments of the post
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "tweets", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

   // all conditional function have to write after useState & useEffect React Hooks function
  if (!session) return <Login />;
  return (
    <>
      <div className="lg:max-w-7xl mx-auto max-h-screen">
        <Head>
          <title>
            {tweet?.name} - {tweet?.content}{" "}
          </title>
          <meta
            name="description"
            content="Twitter Clone with react nextjs firebase and tailwindcss"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="grid grid-cols-12">
          {/* Sidebar */}
          <SideBar />

          {/* Tweet Feed */}
          <div className="col-span-9 lg:col-span-6 border border-gray-100 border-t-0">
            <div className="flex items-center gap-x-3 border-b pb-3 sticky top-0 pt-1.5 z-50 px-3 bg-white">
              <ArrowLeftIcon
                onClick={() => router.push("/")}
                className="w-12 h-12 p-3 hover:bg-gray-200 rounded-full transition duration-300 cursor-pointer"
              />
              <h1 className="text-xl font-bold">Home</h1>
            </div>

            <TweetCard id={id} tweet={tweet} />

            {comments.length > 0 && (
              <div className="">
                <AnimatePresence>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <Comment
                        key={comment.id}
                        commentId={comment.id}
                        originalTweetId={id}
                        comment={comment.data()}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Widget */}
          <Widget
            newsResults={newsResults.articles}
            randomUsers={randomUsers.results}
          />
        </main>
      </div>

      {/* Modal */}
      <div>
        <CommentModal />
      </div>
    </>
  );
}

// SSR
export async function getServerSideProps(context) {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  const randomUsers = await fetch(
    "https://randomuser.me/api/?results=50&inc=name,login,picture"
  ).then((res) => res.json());

  const session = await getSession(context);

  return {
    props: {
      newsResults,
      randomUsers,
      session,
    },
  };
}
