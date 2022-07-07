import { useSession, signIn } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  return (
    <div
      onClick={() => signIn()}
      className="flex items-center justify-center bg-twitter p-8 text-xl text-white"
    >
      Login
    </div>
  );
}
