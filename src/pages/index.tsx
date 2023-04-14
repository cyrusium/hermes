import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { I18nContext } from "../../locales/i18n-react"

import { api } from "../utils/api";

const description = "Hermes is a open source bus routing website and application. Select a destination and find the quickest way to get to it, for free, for everyone"
const img_link = "https://herm.es/og.png"
const url = "https://herm.es/"
const meta_title = "Hermes - Powerfull bus routing website/app"

const Home = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <>
      <Head>
        <title>Hermes</title>
        <meta name="title" content={meta_title}/>
        <meta name="description" content={description}/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content={url}/>
        <meta property="og:title" content={meta_title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={img_link}/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={url}/>
        <meta property="twitter:title" content={meta_title}/>
        <meta property="twitter:description" content={description}/>
        <meta property="twitter:image" content={img_link}/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] text-center">
            {`title`}<br/><span className="text-[hsl(280,100%,70%)]">{`project_name`}</span>
          </h1>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-[3rem] text-center">
            { `description` }
            <I18nContext.Consumer></I18nContext.Consumer>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
