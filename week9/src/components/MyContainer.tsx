import { useTranslation } from "react-i18next"

const MyContainer = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2>{t("home")}</h2>
      <p>{t("front_page_text")}</p>
    </div>
  );
};

export default MyContainer