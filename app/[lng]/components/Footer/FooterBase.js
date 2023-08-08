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
        <footer className="container mx-auto w-full text-gray-700 justify-center items-center">
          <div className="container flex flex-col flex-wrap w-full bg-theme sm:items-center lg:items-start md:flex-row md:flex-no-wrap text-center justify-center px-1">
            <div
              className="flex-shrink-0 w-64 mt-5 mb-5 md:mx-0 sm:items-center list-none"
              id="givingly-cont"
            >
              <Logo
                lng={lng}
                style="text-accent-black title-font xl:text-align mb-3"
                id="givingly"
              />
              <li className="mt-3 text-accent-black text-[14px]">
                {t("Contact us!")}
              </li>
              <div className="mt-3">
                <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start ">
                  <a className="text-accent-black cursor-pointer hover:text-[#8ea10f]">
                    <FaFacebook />
                  </a>
                  <a className="ml-3 text-accent-black cursor-pointer hover:text-[#8ea10f]">
                    <FaTwitter />
                  </a>
                  <a className="ml-3 text-accent-black cursor-pointer hover:text-[#8ea10f]">
                    <FaInstagram />
                  </a>
                  <a className="ml-3 text-accent-black cursor-pointer hover:text-[#8ea10f]">
                    <FaLinkedin />
                  </a>
                </span>
                <div className="text-accent-black text-[14px]">
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
            <div className="flex flex-wrap flex-grow mt-4 -mb-10 text-center md:pl-0 md:mt-6 md:text-center justify-center items-center">
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-accent-black tracking-widest uppercase title-font font-bold text-[14px]">
                  {t("About")}
                </h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#8ea10f] text-[12px] ">
                      {t("Company")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Careers")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      Blog
                    </a>
                  </li>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2 justify-center items-center">
                <h2 className="mb-3 text-accent-black tracking-widest uppercase title-font font-bold text-[14px]">
                  {t("Support")}
                </h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Contact Support")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Help Resources")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Release Updates")}
                    </a>
                  </li>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2 justify-center items-center">
                <h2 className="mb-3 tracking-widest text-accent-black uppercase title-font font-bold text-[14px]">
                  Platform
                </h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Terms & Privacy")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("FAQ")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Fees")}
                    </a>
                  </li>
                </div>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2 justify-center items-center ">
                <h2 className="mb-3 tracking-widest text-accent-black uppercase title-font font-bold text-[14px]">
                  {t("Explore")}
                </h2>
                <div className="mb-10 list-none">
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("What We Do")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("How Givingly Works")}
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#8ea10f] text-[12px]">
                      {t("Funding")}
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-theme">
            <div className="container w-full px-5 py-4 mx-auto">
              <p className="text-accent-black capitalize sm:text-center text-[10px]">
                © 2023 {t("All rights reserved")}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
