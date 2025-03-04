import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { SessionProvider } from 'next-auth/react'
import Head from "next/head";
import { useRouter } from "next/router";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router=useRouter();
  const excludeSideBar =router.pathname.startsWith("/sign-in")||router.pathname.startsWith("/forgot-password")||router.pathname.startsWith("/reset-password")||router.pathname.startsWith("/404")
  return (
  <>
    <SessionProvider session={session}>
    <Head>
<link rel="icon" href="/images/logo/favicon.png" />
</Head>
{excludeSideBar?<Component {...pageProps} />:<Sidebar children={<Component {...pageProps} />}/>}
    </SessionProvider>
  </>
  );
}
