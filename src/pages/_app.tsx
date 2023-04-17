import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';
import TypesafeI18n from "../../locales/i18n-react";
import { Locales } from "../../locales/i18n-types";
import { useState, useEffect } from 'react'
import { navigatorDetector } from 'typesafe-i18n/detectors'
import { detectLocale } from '@locale/i18n-util'
import { loadLocale } from '@locale/i18n-util.sync'

import { api } from "../utils/api";

import "../styles/globals.css";
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import Header from "../components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [locale, setLocale] = useState<null | Locales>(null)
  useEffect(() => {
    const detectedLocale = detectLocale(navigatorDetector)
    const locale = router.locale as (Locales | undefined) ?? detectedLocale ?? "br"
    loadLocale(locale)
    setLocale(locale)
  }, [router])

  if (!locale) {
    return <div>Loading...</div>
  }

  return (
    <TypesafeI18n locale={locale}>
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