import WelcomePage from "../[lng]/welcome/page";

const Home = async ({ params: { lng } }) => {
  return (
    <>
      <WelcomePage lng={lng} />
    </>
  );
};

export default Home;
