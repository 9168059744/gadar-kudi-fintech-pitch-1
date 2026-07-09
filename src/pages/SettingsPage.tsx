import { useTranslation } from 'react-i18next';

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
      {/* TODO: Implement Settings Form */}
    </div>
  );
}