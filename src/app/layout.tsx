import type { Metadata, Viewport } from "next";
import { Oswald, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"],
    display: "swap",
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "MŌRA — The Art of Every Pour",
        template: "%s | MŌRA Coffee",
    },
    description:
        "A modern specialty coffee house for expressive flavours, thoughtful craft and the art of every pour.",
    applicationName: "MŌRA",
    keywords: ["MŌRA", "specialty coffee", "coffee house", "signature coffee"],
    openGraph: {
        title: "MŌRA — The Art of Every Pour",
        description: "A different perspective on specialty coffee.",
        type: "website",
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#211710",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${oswald.variable} ${manrope.variable}`}>
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
