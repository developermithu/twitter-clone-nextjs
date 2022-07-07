import Head from "next/head";
import Image from "next/image";
import TweetFeed from "../components/TweetFeed";
import SideBar from "../components/SideBar";
import Widget from "../components/Widget";

export default function Home({ newsResults, randomUsers }) {
  return (
    <div className=" lg:max-w-7xl mx-auto">
      <Head>
        <title>Twitter Clone By DeveloperMithu</title>
        <meta
          name="description"
          content="Twitter Clone with react nextjs firebase and tailwindcss"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-12 pt-3">
        {/* Sidebar */}
        <SideBar />

        {/* News Feed */}
        <TweetFeed />

        {/* Widget */}
        <Widget
          newsResults={newsResults.articles}
          randomUsers={randomUsers.results}
        />
      </main>
    </div>
  );
}

// SSR
export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  const randomUsers = await fetch(
    "https://randomuser.me/api/?results=50&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsers,
    },
  };
}
