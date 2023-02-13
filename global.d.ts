declare abstract class TranslationSwitcher {
  private currentPath: string[] = [];
  public constructor(private lang: string, currentPath: string)
  public get path()
  public get access<T, D extends keyof T>(obj: T, id: D): { access: TranslationSwitcher, value: T[D] }
  public changeLanguage(lang: string)
  public switchPath(path: string)
  private parse(id: string): string[]
  public accessRecursive(path: string[]): Result<RecursiveTextID> 
  private getType(instance: string | string[] | RecursiveTextID): 'string' | 'array' | 'object'
  public getPage(): Result<RecursiveTextID> 
  public getText(id: string, lang: string | null = null): Result<string>
  public getGenericText(id: string, lang: string | null = null): Result<string>
  public getTextFrom(id: string, lang: string | null = null): Result<string>
  public getTextArray(id: string, lang: string | null = null): Result<string[]>
  public getTextArrayFrom(id: string, lang: string | null = null): Result<string[]>
}

interface RecursiveAccess<T, D extends keyof T> {
  get: (key: keyof T[D]) => RecursiveAccess<T[D], keyof T[D]>,
  value: T[D],
}

declare interface RecursiveTextID {
  [id: string]: RecursiveTextID | string | string[];
}

declare type Result<T> = {
  text: T;
  error?: true;
} | {
  text: null,
  error: true
}

declare module 'props' {
  import { type NextPage } from "next";
  interface PageProps {
    text: RecursiveTextID
    translation: InstanceType<typeof TranslationSwitcher>
  }
  type Page = NextPage<PageProps, Record<string, never>>
}


