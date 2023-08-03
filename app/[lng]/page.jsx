import WelcomePage from "../[lng]/welcome/page";
import { useTranslation } from "../i18n";

const Home = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);
  return (
    <>
      <WelcomePage lng={lng} t={t} />
    </>
  );
};

export default Home;
