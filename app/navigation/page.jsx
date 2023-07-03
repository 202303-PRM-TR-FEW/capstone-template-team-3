import "./navigation.css"

const Navigation = () => {
    return (
        <main className="navigation-main">
            <section className="w-2/3">
                <p className="option-paragraph">I want to:</p>
                <div className="flex justify-evenly items-center p-10 text-left">
                    <input type="checkbox" name="support" id="support" className="w-[48px] h-[48px] rounded-xl text-theme outline-none focus:outline-none" />
                    <div className="flex flex-col">
                        <span className="support-main">Support</span>
                        <span className="support-appendix">other projects</span>
                    </div>
                </div>
                <div className="flex justify-evenly items-center p-10 text-left">
                    <input type="checkbox" name="support" id="support" className="w-[48px] h-[48px] rounded-xl text-theme" />
                    <div className="flex flex-col">
                        <span className="support-main">Kick-off</span>
                        <span className="support-appendix">my project</span>
                    </div>
                </div>
            </section>
            <section className="w-1/3">
                <div className="flex flex-col justify-between bg-black rounded-2xl relative">
                    <div>
                        <div className="bg-theme m-7 rounded-2xl h-[22.5em] w-5/6 mx-auto overflow-visible">
                            <img src="https://assets.api.uizard.io/api/cdn/stream/e0453b28-0e1c-49c7-a0bc-629da3689327.png" alt="" className="absolute inset-5 w-11/12" />
                        </div>
                    </div>
                    <div className="px-10 py-5 text-accent">
                        <h3 className="text-left inform-text my-5">Stay informed</h3>
                        <p>Want to be among the first people to know about amazing projects on our platform? Join our monthly digest of the best causes.</p>
                        <button className="bg-theme px-2 py-3 mt-10 text-black w-full rounded-2xl">Join newsletter</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Navigation