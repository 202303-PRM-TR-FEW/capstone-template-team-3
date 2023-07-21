"use client"

import "./navigation.css";
import Image from "next/image";
import navigationBanner from "public/assets/images/navigation-banner.png";
import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../i18n/client";

export default  function Navigation({ lng }) {
  const [supportIsChecked, setSupportIsChecked] = useState(false);
  const [kickoffIsChecked, setKickoffIsChecked] = useState(false);
  const router = useRouter();
  const { t } = useTranslation(lng, "navigation");

  const handleSupportCheck = () => {
    setSupportIsChecked(!supportIsChecked);
  };

  const handleKickoffCheck = () => {
    setKickoffIsChecked(!kickoffIsChecked);
  };

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (supportIsChecked) {
        router.push("/campaigns");
      }
    }, 1000);
    return () => clearTimeout(redirectTimeout);
  }, [supportIsChecked, router]);

  return (
    <main className="navigation-main">
      <section className="checkbox-section">
        <p className="checkbox-option-paragraph-text">{t("I-want-to")}:</p>
        <div className="checkbox-support-container">
          <input
            type="checkbox"
            name="support"
            id="support"
            className="checkbox-input"
            onChange={handleSupportCheck}
            checked={supportIsChecked}
            disabled={kickoffIsChecked}
          />
          <div className="checkbox-text-container">
            <h2 className="checkbox-header-text">Support</h2>
            <span className="checkbox-appendix-text">other projects</span>
          </div>
        </div>
        <hr className="navigation-divider" />
        <div className="checkbox-kick-off-container">
          <input
            type="checkbox"
            name="kick-off"
            id="kick-off"
            className="checkbox-input"
            checked={kickoffIsChecked}
            disabled={supportIsChecked}
            onChange={handleKickoffCheck}
          />
          <div className="checkbox-text-container">
            <h2 className="checkbox-header-text">Kick-off</h2>
            <span className="checkbox-appendix-text">my project</span>
          </div>
        </div>
      </section>
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-banner-container">
            <Image
              src={navigationBanner}
              alt="Illustration of a hand holding green hearts near books."
              className="newsletter-banner"
              priority={true}
            />
          </div>
          <article className="newsletter-text-container">
            <h3 className="newsletter-header-text">Stay informed</h3>
            <p className="newsletter-paragraph-text">
              Want to be among the first people to know about amazing projects
              on our platform? Join our monthly digest of <br />
              the best causes.
            </p>
          </article>
          <Button
            type={"button"}
            style="newsletter-button"
            name={"Join newsletter"}
          />
        </div>
      </section>
    </main>
  );
}
