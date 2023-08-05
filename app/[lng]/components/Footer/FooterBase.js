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

export const FooterBase = ({ t, lng }) => {
  return (
    <div className="flex flex-col bg-transparent">
      <section
        className="curve w-full h-32 2xl:bg-cover object-fill"
        style={{
          backgroundImage: "url(/assets/images/wave-haikei3.svg)",
        }}
      ></section>
      <footer className="w-full text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap px-5 pt-0 w-full bg-[#D4EE26] sm:items-center lg:items-start md:flex-row md:flex-no-wrap sm:text-center max-w-none">
          <div
            className="flex-shrink-0 w-64 mt-5 mb-5 text-center md:mx-0 sm:items-center"
            id="givingly-cont"
          >
            <a
              className="text-2xl text-gray-900 title-font xl:text-align"
              id="givingly"
            >
              <Logo lng={lng} />
            </a>
            <p className="mt-2 text-gray-900 text-[14px]">{t("Contact us!")}</p>
            <div className="mt-4">
              <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                <a className="text-gray-900 cursor-pointer hover:text-[#8ea10f]">
                  <FaFacebook />
                </a>
                <a className="ml-3 text-gray-900 cursor-pointer hover:text-[#8ea10f]">
                  <FaTwitter />
                </a>
                <a className="ml-3 text-gray-900 cursor-pointer hover:text-[#8ea10f]">
                  <FaInstagram />
                </a>
                <a className="ml-3 text-gray-900 cursor-pointer hover:text-[#8ea10f]">
                  <FaLinkedin />
                </a>
              </span>
              <div className="mt-4">
                <Trans i18nKey="languageSwitcher" t={t}>
                  Switch from <strong>{{ lng }}</strong> to:{" "}
                </Trans>
                {languages
                  .filter((l) => lng !== l)
                  .map((l, index) => {
                    return (
                      <span key={l}>
                        {index > 0 && " or "}
                        <Link href={`/${l}`}>{l}</Link>
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-0 md:mt-6 md:text-center">
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 font-medium text-gray-900 tracking-widest uppercase title-font">
                About
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#8ea10f] ">
                    Company
                  </a>
                </li>
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">Careers</a>
                </li>
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">Blog</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 font-medium text-gray-900 tracking-widest uppercase title-font">
                Support
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">
                    Contact Support
                  </a>
                </li>
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">
                    Help Resources
                  </a>
                </li>
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">
                    Release Updates
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 font-medium tracking-widest text-gray-900 uppercase title-font">
                Platform
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">
                    Terms &amp; Privacy
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#8ea10f]">FAQ</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#8ea10f]">Fees</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 font-medium tracking-widest text-gray-900 uppercase title-font">
                Explore
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#8ea10f]">
                    What We Do
                  </a>
                </li>
                <li className="mt-3">
                  <a className="cursor-pointer hover:text-[#8ea10f]">
                    How Givingly Works
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#8ea10f]">
                    Funding
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-[#D4EE26]">
          <div className="container w-full px-5 py-4 mx-auto">
            <p className="text-sm text-gray-900 capitalize sm:text-center text-[11px]">
              © 2023 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
