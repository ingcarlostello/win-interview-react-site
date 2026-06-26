import type { Language } from './theme.type';

export type TranslationKey = string;

export type TranslationDict = Record<TranslationKey, string>;

export type Translations = Record<Language, TranslationDict>;
