import type { Language } from '@/types/theme.type';
import type { Translations } from '@/types/i18n.type';

import { es as esLanding } from './translations/es';
import { en as enLanding } from './translations/en';
import { privacyEs } from './translations/legal/privacy.es';
import { privacyEn } from './translations/legal/privacy.en';
import { refundsEs } from './translations/legal/refunds.es';
import { refundsEn } from './translations/legal/refunds.en';
import { termsEs } from './translations/legal/terms.es';
import { termsEn } from './translations/legal/terms.en';

export const translations: Translations = {
  es: { ...esLanding, ...privacyEs, ...refundsEs, ...termsEs },
  en: { ...enLanding, ...privacyEn, ...refundsEn, ...termsEn },
};

export type { Language };
