import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading"
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Dog Alert Web",
  description: "Melde Giftkoeder und warne andere Hundebesitzer in deiner Umgebung."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${baloo.variable} ${nunito.variable} cartoon-shell`}>
        {children}
      </body>
    </html>
  );
}
