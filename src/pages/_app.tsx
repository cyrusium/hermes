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
          <Component {...pageProps} />
        </NextUIProvider>
      </I18nProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);