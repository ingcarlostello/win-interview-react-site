import type { LegalDoc } from '@/types/legal.type';
import { privacyEs } from '@/i18n/translations/legal/privacy.es';
import { privacyEn } from '@/i18n/translations/legal/privacy.en';
import { refundsEs } from '@/i18n/translations/legal/refunds.es';
import { refundsEn } from '@/i18n/translations/legal/refunds.en';
import { termsEs } from '@/i18n/translations/legal/terms.es';
import { termsEn } from '@/i18n/translations/legal/terms.en';

export const PRIVACY_DOC: LegalDoc = {
  id: 'privacy',
  labelKey: 'page.label',
  titleKey: 'page.title',
  updatedKey: 'page.updated',
  introKey: 'intro.0',
  sections: [
    { titleKey: 'sec1.title', blocks: [{ kind: 'paragraph', key: 'sec1.text' }] },
    {
      titleKey: 'sec2.title',
      blocks: [
        { kind: 'paragraph', key: 'sec2.intro' },
        {
          kind: 'list',
          items: ['sec2.1', 'sec2.2', 'sec2.3', 'sec2.4', 'sec2.5'],
        },
      ],
    },
    { titleKey: 'sec3.title', blocks: [{ kind: 'paragraph', key: 'sec3.text' }] },
    { titleKey: 'sec4.title', blocks: [{ kind: 'paragraph', key: 'sec4.text' }] },
    {
      titleKey: 'sec5.title',
      blocks: [
        { kind: 'paragraph', key: 'sec5.intro' },
        {
          kind: 'list',
          items: ['sec5.1', 'sec5.2', 'sec5.3', 'sec5.4', 'sec5.5', 'sec5.6'],
        },
        { kind: 'paragraph', key: 'sec5.text_2' },
      ],
    },
    { titleKey: 'sec6.title', blocks: [{ kind: 'paragraph', key: 'sec6.text' }] },
    { titleKey: 'sec7.title', blocks: [{ kind: 'paragraph', key: 'sec7.text' }] },
    {
      titleKey: 'sec8.title',
      blocks: [
        { kind: 'paragraph', key: 'sec8.intro' },
        {
          kind: 'list',
          items: ['sec8.1', 'sec8.2', 'sec8.3', 'sec8.4', 'sec8.5', 'sec8.6'],
        },
        { kind: 'paragraph', key: 'sec8.text_2' },
      ],
    },
    { titleKey: 'sec9.title', blocks: [{ kind: 'paragraph', key: 'sec9.text' }] },
    { titleKey: 'sec10.title', blocks: [{ kind: 'paragraph', key: 'sec10.text' }] },
    { titleKey: 'sec11.title', blocks: [{ kind: 'paragraph', key: 'sec11.text' }] },
  ],
  translations: { es: privacyEs, en: privacyEn },
};

export const REFUNDS_DOC: LegalDoc = {
  id: 'refunds',
  labelKey: 'page.label',
  titleKey: 'page.title',
  updatedKey: 'page.updated',
  introKey: 'intro.0',
  sections: [
    { titleKey: 'sec1.title', blocks: [{ kind: 'paragraph', key: 'sec1.text' }] },
    {
      titleKey: 'sec2.title',
      blocks: [
        { kind: 'paragraph', key: 'sec2.intro' },
        { kind: 'list', items: ['sec2.1', 'sec2.2', 'sec2.3', 'sec2.4'] },
      ],
    },
    {
      titleKey: 'sec3.title',
      blocks: [
        { kind: 'paragraph', key: 'sec3.intro' },
        { kind: 'list', items: ['sec3.1', 'sec3.2', 'sec3.3', 'sec3.4', 'sec3.5'] },
      ],
    },
    {
      titleKey: 'sec4.title',
      blocks: [
        { kind: 'paragraph', key: 'sec4.text' },
        { kind: 'list', items: ['sec4.1', 'sec4.2', 'sec4.3'] },
        { kind: 'paragraph', key: 'sec4.text_2' },
      ],
    },
    { titleKey: 'sec5.title', blocks: [{ kind: 'paragraph', key: 'sec5.text' }] },
    { titleKey: 'sec6.title', blocks: [{ kind: 'paragraph', key: 'sec6.text' }] },
    { titleKey: 'sec7.title', blocks: [{ kind: 'paragraph', key: 'sec7.text' }] },
    { titleKey: 'sec8.title', blocks: [{ kind: 'paragraph', key: 'sec8.text' }] },
  ],
  translations: { es: refundsEs, en: refundsEn },
};

export const TERMS_DOC: LegalDoc = {
  id: 'terms',
  labelKey: 'page.label',
  titleKey: 'page.title',
  updatedKey: 'page.updated',
  introKey: 'intro.0',
  sections: [
    { titleKey: 'sec1.title', blocks: [{ kind: 'paragraph', key: 'sec1.text' }] },
    { titleKey: 'sec2.title', blocks: [{ kind: 'paragraph', key: 'sec2.text' }] },
    { titleKey: 'sec3.title', blocks: [{ kind: 'paragraph', key: 'sec3.text' }] },
    { titleKey: 'sec4.title', blocks: [{ kind: 'paragraph', key: 'sec4.text' }] },
    { titleKey: 'sec5.title', blocks: [{ kind: 'paragraph', key: 'sec5.text' }] },
    { titleKey: 'sec6.title', blocks: [{ kind: 'paragraph', key: 'sec6.text' }] },
    {
      titleKey: 'sec7.title',
      blocks: [
        { kind: 'paragraph', key: 'sec7.intro' },
        { kind: 'list', items: ['sec7.1', 'sec7.2', 'sec7.3', 'sec7.4', 'sec7.5'] },
      ],
    },
    { titleKey: 'sec8.title', blocks: [{ kind: 'paragraph', key: 'sec8.text' }] },
    { titleKey: 'sec9.title', blocks: [{ kind: 'paragraph', key: 'sec9.text' }] },
    { titleKey: 'sec10.title', blocks: [{ kind: 'paragraph', key: 'sec10.text' }] },
    { titleKey: 'sec11.title', blocks: [{ kind: 'paragraph', key: 'sec11.text' }] },
    { titleKey: 'sec12.title', blocks: [{ kind: 'paragraph', key: 'sec12.text' }] },
    { titleKey: 'sec13.title', blocks: [{ kind: 'paragraph', key: 'sec13.text' }] },
    { titleKey: 'sec14.title', blocks: [{ kind: 'paragraph', key: 'sec14.text' }] },
  ],
  translations: { es: termsEs, en: termsEn },
};

export const LEGAL_DOCS_MAP: Record<LegalDoc['id'], LegalDoc> = {
  privacy: PRIVACY_DOC,
  refunds: REFUNDS_DOC,
  terms: TERMS_DOC,
};
