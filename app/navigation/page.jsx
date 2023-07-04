import "./navigation.css"
import Image from "next/image"
import navigationBanner from "public/assets/images/navigation-banner.png"

const Navigation = () => {
    return (
        <main className="navigation-main">
            <section className="checkbox-section">
                <p className="checkbox-option-paragraph-text">I want to:</p>
                <div className="checkbox-support-container">
                    <input type="checkbox" name="support" id="support" className="checkbox-input" />
                    <div className="checkbox-text-container">
                        <h2 className="checkbox-header-text">Support</h2>
                        <span className="checkbox-appendix-text">other projects</span>
                    </div>
                </div>
                <hr className="navigation-divider" />
                <div className="checkbox-kick-off-container">
                    <input type="checkbox" name="support" id="support" className="checkbox-input" />
                    <div className="checkbox-text-container">
                        <h2 className="checkbox-header-text">Kick-off</h2>
                        <span className="checkbox-appendix-text">my project</span>
                    </div>
                </div>
            </section>
            <section className="newsletter-section">
                <div className="newsletter-container">
                    <div>
                        <div className="newsletter-banner-container">
                            <Image src={navigationBanner}
                                alt="Illustration of a hand holding green hearts near books." className="newsletter-banner"
                                priority={true} />
                        </div>
                    </div>
                    <article className="newsletter-text-container">
                        <h3 className="newsletter-header-text">Stay informed</h3>
                        <p className="newsletter-paragraph-text">Want to be among the first people to know about amazing projects on our platform? Join our monthly digest of <br />the best causes.</p>
                    </article>
                    <button className="newsletter-button">Join newsletter</button>
                </div>
            </section>
        </main>
    )
}

export default Navigation