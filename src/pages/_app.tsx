import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';
import TypesafeI18n from "../../locales/i18n-react";
import { Locales } from "../../locales/i18n-types";

import { api } from "../utils/api";

import "../styles/globals.css";
import type { Session } from "next-auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <TypesafeI18n locale={router.locale as (Locales | undefined) ?? "br"}>
      <SessionProvider session={session}>
          <NextUIProvider>
            <header className='fixed top-8 max-sm:top-4 z-[999] flex w-full max-w-screen-2xl left-2/4 -translate-x-2/4 flex-wrap px-4'>
              <Header active={2}/>
            </header>
            <main>
              <Component {...pageProps} />
            </main>
          </NextUIProvider>
      </SessionProvider>
    </TypesafeI18n>
  );
};

export default api.withTRPC(MyApp);