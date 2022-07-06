import Head from "next/head";
import Image from "next/image";
import NewsFeed from "../components/NewsFeed";
import SideBar from "../components/SideBar";
import Widget from "../components/Widget";

export default function Home() {
  return (
    <div className=" lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter Clone By DeveloperMithu</title>
        <meta
          name="description"
          content="Twitter Clone with react nextjs firebase and tailwindcss"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-9 pt-3">
        {/* Sidebar */}
        <SideBar />

        {/* News Feed */}
        <NewsFeed />

        {/* Widget */}
        <Widget />
      </main>
    </div>
  );
}
