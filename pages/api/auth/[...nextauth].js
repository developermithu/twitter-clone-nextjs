import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },

  // random key as I wish
  secret: process.env.SECRET_KEY,

  // through callback function we can pass extra data with session like uid, username
  callbacks: {
    async session({ session, token }) {
      const name = session.user.name;

      session.user.username = name.split(" ").join("").toLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
});
