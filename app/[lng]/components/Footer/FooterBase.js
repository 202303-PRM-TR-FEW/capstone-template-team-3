import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../../i18n/settings";
import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import Logo from "../Logo/Logo";
import Image from "next/image";

export const FooterBase = ({ t, lng, pathname }) => {
  return (
    <div className="flex flex-col bg-transparent">
      <section
        className={
          pathname === `/${lng}`
            ? ""
            : "curve w-full h-32 2xl:bg-cover object-fill"
        }
        style={{
          backgroundImage:
            pathname === `/${lng}`
              ? ""
              : "url(/assets/images/wave-haikei3.svg)",
        }}
      ></section>
      <div className="bg-theme">
        <footer className="footer-main ">
          <div className="footer-submain flex-row">
            <div className="logo-main">
              <Logo lng={lng} style="logo" />
              <li className="contact">{t("Contact us!")}</li>
              <div className="mt-3">
                <span className="social-links">
                  <a className="facebook">
                    <FaFacebook />
                  </a>
                  <a className="twitter">
                    <FaTwitter />
                  </a>
                  <a className="instagram">
                    <FaInstagram />
                  </a>
                  <a className="linkedin">
                    <FaLinkedin />
                  </a>
                </span>
                <div className="lng-section">
                  <Trans i18nKey="languageSwitcher" t={t}>
                    Switch to:
                  </Trans>
                  {languages
                    .filter((l) => lng !== l)
                    .map((l, index) => {
                      return (
                        <span key={l}>
                          {index > 0 && " or "}
                          <Link href={`/${l}`}>
                            <Image
                              alt="lng flag"
                              className="inline"
                              width={40}
                              height={40}
                              src={
                                lng === "en"
                                  ? "/assets/images/tr.png"
                                  : "/assets/images/en.png"
                              }
                            />
                          </Link>
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="footer-info-section">
              <div className="about-section">
                <h2 className="about">{t("About")}</h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="company">{t("Company")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="careers">{t("Careers")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="blog">Blog</a>
                  </li>
                </div>
              </div>
              <div className="support-section">
                <h2 className="support">{t("Support")}</h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="contact-support">{t("Contact Support")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="help-resources">{t("Help Resources")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="release-updates">{t("Release Updates")}</a>
                  </li>
                </div>
              </div>
              <div className="platform-section">
                <h2 className="platform">Platform</h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="terms-privacy">{t("Terms & Privacy")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="FAQ">{t("FAQ")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="fees">{t("Fees")}</a>
                  </li>
                </div>
              </div>
              <div className="explore-section">
                <h2 className="explore">{t("Explore")}</h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="what-we-do">{t("What We Do")}</a>
                  </li>
                  <li className="mt-3">
                    <a className="how-givingly-works">
                      {t("How Givingly Works")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="funding">{t("Funding")}</a>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-theme">
            <div className="rights-section">
              <p className="rights">© 2023 {t("All rights reserved")}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
