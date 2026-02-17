import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/app/providers";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", adjustFontFallback: false});

export const metadata = {
  title: "KONGO ART FOURNITURES - Art et Confort",
  description: "Découvrez KONGO ART FOURNITURES, votre destination pour l'art et le bien-être. Explorez nos collections exclusives et nos services premium.",
  keywords: "art, sport, confort, bien-être, galerie, événements",
  authors: [{ name: "KONGO ART FOURNITURES" }],
  openGraph: {
    title: "KONGO ART FOURNITURES",
    description: "Art, Sport et Confort - Une expérience unique",
    type: "website",
    url: "https://kongoartfournitures.com",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "KONGO ART FOURNITURES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KONGO ART FOURNITURES",
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
        <SessionProvider>
          <Navbar />
          {children}
          <div className="">
            <div className="xl:px-[3rem] lg:px-[3rem] md:px-[2rem] px-0">
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
