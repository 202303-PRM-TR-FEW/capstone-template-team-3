import "styles/globals.css";
import Navbar from "../[lng]/components/Navbar/Navbar";
import { ReduxProvider } from "../../app/lib/features/provider";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { Footer } from "./components/Footer/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: "Givingly",
  description: "Generated by create next app",
};

const RootLayout = ({ children, params: { lng } }) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="body-text body-bg">
        <ReduxProvider>
          <Navbar lng={lng} />
          {children}
          <ToastContainer
            lng={lng}
            position="bottom-right"
            autoClose={5000}
            limit={3}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastStyle={{
              minWidth: "max-content",
              maxWidth: "320px",
              backgroundColor: "rgb(250, 250, 250)",
            }}
          />
          <Footer lng={lng} />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
