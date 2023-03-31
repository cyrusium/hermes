import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';

import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { activate } from "../../locale/i18n";

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
    void activate(router.locale ?? "en");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <SessionProvider session={session}>
      <I18nProvider i18n={i18n}>
        <NextUIProvider>
          <header className='fixed top-8 max-sm:top-4 z-[999] flex w-full max-w-screen-2xl left-2/4 -translate-x-2/4 flex-wrap px-4'>
            <Header active={2}/>
          </header>
          <main>
            <Component {...pageProps} />
          </main>
        </NextUIProvider>
      </I18nProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);