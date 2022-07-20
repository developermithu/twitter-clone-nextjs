import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import NewsItem from "./NewsItem";
import RandomUserList from "./RandomUserList";
import { AnimatePresence, motion } from "framer-motion";

export default function Widget({ newsResults, randomUsers }) {
  const [articleNum, setAarticleNum] = useState(3);
  const [randomUserNumber, setRandomUserNumber] = useState(3);

  return (
    <div className="col-span-3 hidden lg:inline ml-6">
      <div className="sticky top-0 py-1 bg-white">
        <div className="flex gap-x-2 items-center bg-gray-100 py-2.5 px-5 rounded-full">
          <SearchIcon className="h-4 w-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search twitter.."
            className=" bg-transparent outline-none placeholder:text-gray-600 flex-1"
          />
        </div>
      </div>

      {/* Top Headline News Result */}
      <div className="mt-5 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold py-2 pl-3">What&apos;s happening?</h2>

        <AnimatePresence>
          {newsResults?.slice(0, articleNum).map((article) => {
            return (
              <motion.div
                key={article.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <NewsItem key={article.url} article={article} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          onClick={() => setAarticleNum(articleNum + 3)}
          className="bg-gray-100 hover:bg-gray-200 block w-full py-3 text-twitter rounded-lg rounded-t-none text-left pl-3 transition duration-300"
        >
          Show more
        </button>
      </div>

      {/* Random Users */}
      <div className="mt-5 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold py-2 pl-3">Who To Follow</h2>

        <AnimatePresence>
          {randomUsers?.slice(0, randomUserNumber).map((user) => {
            return (
              <motion.div
                key={user.login.uuid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <RandomUserList key={user.login.uuid} user={user} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          onClick={() => setRandomUserNumber(randomUserNumber + 3)}
          className="bg-gray-100 hover:bg-gray-200 block w-full py-3 text-twitter rounded-lg rounded-t-none text-left pl-3 transition duration-300"
        >
          Show more
        </button>
      </div>
    </div>
  );
}
