import "../styles/globals.css";
import Link from "next/link";

export const metadata = {
    title: "Givingly",
    description: "Generated by create next app",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="example">
                <nav>
                    <Link
                        href="/"
                        className="mx-5"
                    >
                        Home
                    </Link>
                    <Link
                        href="/Projects"
                        className="mx-5"
                    >
                        My projects
                    </Link>
                    <Link href='/Profile'
                        className="mx-5">
                        Profile
                    </Link>
                </nav>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
