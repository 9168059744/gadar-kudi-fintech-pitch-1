import { useTranslation } from 'react-i18next';

export function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
      {/* TODO: Implement Profile Form */}
    </div>
  );
}