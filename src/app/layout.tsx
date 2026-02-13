import type { Metadata } from "next";
import { Architects_Daughter, Nunito } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const architects = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-comic"
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Dog Alert - Schütze deinen Hund vor Giftködern",
  description: "Die Community-App, die Hundebesitzer zusammenbringt. Melde Gefahren, werde gewarnt, rette Leben."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${architects.variable} ${nunito.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
