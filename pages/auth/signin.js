import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-y-8 p-20 shadow rounded-lg ">
          {/* Icon */}
          <svg
            className="fill-twitter h-20"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>

          <h1 className="text-4xl font-bold">Join Twitter Today</h1>

          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="py-2 px-10 text-lg font-semibold border border-slate-300 rounded-full hover:ring-2 hover:ring-blue-500 active:bg-blue-100 flex items-center gap-x-3 transition duration-300"
              >
                {provider.name === "Google" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    alt=""
                    className="w-6 h-6"
                  />
                )}
                {provider.name === "GitHub" && (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                )}
                Sign In With {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
