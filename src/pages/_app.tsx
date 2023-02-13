import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextIntlProvider } from 'next-intl';
import { NextUIProvider } from '@nextui-org/react';

import { api } from "../utils/api";

import "../styles/globals.css";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextIntlProvider messages={pageProps.messages}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextIntlProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
