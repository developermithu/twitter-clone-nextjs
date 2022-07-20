import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
