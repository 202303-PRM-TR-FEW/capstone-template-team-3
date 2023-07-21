import WelcomePage from "app/[lng]/welcome/page.jsx";
import Link from "next/link";
import { useTranslation } from "app/i18n";
import { Footer } from "app/[lng]/components/Footer";

// const Home = () => {
//   return (
//     <main>
//       <WelcomePage />
//     </main>
//   );
// };

// export default Home;

const Home = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);
  return (
    <>
      <WelcomePage lng={lng} t={t}/>
      {/* <h1>{t("title")}</h1>
      <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
      <br />
      <Link href={`/${lng}/client-page`}>{t("to-client-page")}</Link> */}
      {/* <Footer lng={lng} /> */}
    </>
  );
};

export default Home;
