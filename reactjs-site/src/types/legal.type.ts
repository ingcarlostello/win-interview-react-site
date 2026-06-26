import type { Language } from './theme.type';

export type LegalDocId = 'privacy' | 'refunds' | 'terms';

export interface LegalListBlock {
  kind: 'list';
  introKey?: string;
  items: string[];
}

export interface LegalParagraphBlock {
  kind: 'paragraph';
  key: string;
}

export type LegalBlock = LegalListBlock | LegalParagraphBlock;

export interface LegalSection {
  titleKey: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  id: LegalDocId;
  labelKey: string;
  titleKey: string;
  updatedKey: string;
  introKey: string;
  sections: LegalSection[];
  translations: Record<Language, Record<string, string>>;
}
