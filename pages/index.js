import Head from "next/head";
import Image from "next/image";
import SideBar from "../components/SideBar";
import Widget from "../components/Widget";
import Feed from "../components/Feed";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import CommentModal from "../components/CommentModal";

export default function Home({ newsResults, randomUsers }) {
  const { data: session } = useSession();
  // if (!session) return <Login />;
  // console.log(session);

  return (
    <>
      <div className="lg:max-w-7xl mx-auto max-h-screen">
        <Head>
          <title>Twitter Clone By DeveloperMithu</title>
          <meta
            name="description"
            content="Twitter Clone with react nextjs firebase and tailwindcss"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="grid grid-cols-12">
          {/* Sidebar */}
          <SideBar />

          {/* News Feed */}
          <Feed />

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
