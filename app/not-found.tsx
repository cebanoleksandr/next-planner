import { useTranslations } from "next-intl";

const NotFound = () => {
  const t = useTranslations('AimPage');

  return (
    <div>
      <h1>{t('goal_not_found')}</h1>
    </div>
  );
}

export default NotFound