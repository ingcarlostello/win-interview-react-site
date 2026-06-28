import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { RefundsPage } from '@/pages/RefundsPage';
import { TermsPage } from '@/pages/TermsPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { UpgradePage } from '@/pages/UpgradePage';
import { ROUTES } from '@/constants/routes.constants';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        <Route path={ROUTES.REFUNDS} element={<RefundsPage />} />
        <Route path={ROUTES.TERMS} element={<TermsPage />} />
        <Route path={ROUTES.UPGRADE} element={<UpgradePage />} />
      </Route>
      {/* Rutas de auth/dashboard con su propio shell (sin el Layout de marketing) */}
      <Route path={`${ROUTES.SIGN_IN}/*`} element={<SignInPage />} />
      <Route path={`${ROUTES.SIGN_UP}/*`} element={<SignUpPage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
