// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'br'

export type Locales =
	| 'br'
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * A​p​r​e​s​e​n​t​a​n​d​o​:
	 */
	title: string
	/**
	 * H​e​r​m​e​s
	 */
	project_name: string
	/**
	 * O​ ​a​p​l​i​c​a​t​i​v​o​ ​d​e​ ​p​r​o​x​i​m​a​ ​g​e​r​a​ç​ã​o​ ​p​a​r​a​ ​r​o​t​a​s​ ​d​e​ ​ô​n​i​b​u​s
	 */
	description: string
	header: {
		/**
		 * I​n​í​c​i​o
		 */
		home: string
		/**
		 * R​o​t​a​s
		 */
		routes: string
	}
}

export type TranslationFunctions = {
	/**
	 * Apresentando:
	 */
	title: () => LocalizedString
	/**
	 * Hermes
	 */
	project_name: () => LocalizedString
	/**
	 * O aplicativo de proxima geração para rotas de ônibus
	 */
	description: () => LocalizedString
	header: {
		/**
		 * Início
		 */
		home: () => LocalizedString
		/**
		 * Rotas
		 */
		routes: () => LocalizedString
	}
}

export type Formatters = {}