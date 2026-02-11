import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", adjustFontFallback: false});

export const metadata = {
  title: "KIVU ART & CONFORT - Art, Sport et Confort",
  description: "Découvrez KIVU ART & CONFORT, votre destination pour l'art, le sport et le bien-être. Explorez nos collections exclusives et nos services premium.",
  keywords: "art, sport, confort, bien-être, galerie, événements",
  authors: [{ name: "KIVU ART & CONFORT" }],
  openGraph: {
    title: "KIVU ART & CONFORT",
    description: "Art, Sport et Confort - Une expérience unique",
    type: "website",
    url: "https://kivuartconfort.com",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "KIVU ART & CONFORT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KIVU ART & CONFORT",
    description: "Art, Sport et Confort - Une expérience unique",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${montserrat.className}  relative`}>
        <Navbar />
        {children}
        <div className="">
          <div className="xl:px-[3rem] lg:px-[3rem] md:px-[2rem] px-0">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
