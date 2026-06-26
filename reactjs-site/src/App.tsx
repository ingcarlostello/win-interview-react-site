import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { RefundsPage } from '@/pages/RefundsPage';
import { TermsPage } from '@/pages/TermsPage';
import { ROUTES } from '@/constants/routes.constants';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        <Route path={ROUTES.REFUNDS} element={<RefundsPage />} />
        <Route path={ROUTES.TERMS} element={<TermsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
