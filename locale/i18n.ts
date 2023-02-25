/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { i18n } from "@lingui/core";
import { en, br } from "make-plural/plurals";
import { messages as baseMsg } from "./br/messages";	

i18n.loadLocaleData("en", { plurals: en });
i18n.loadLocaleData("br", { plurals: br });

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there're
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */
export async function activate(locale: string) {
  const { messages } = await import(`./${locale}/messages`);

  i18n.load(locale, {
    ...baseMsg,
    ...messages,
  });
  i18n.activate(locale);
}