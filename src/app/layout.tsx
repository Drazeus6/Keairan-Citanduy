import type { Metadata } from "next";
import "@/styles/globals.css";
import { Masthead } from "@/components/chrome/Masthead";
import { Footer } from "@/components/chrome/Footer";
import { MSWProvider } from "@/components/MSWProvider";

export const metadata: Metadata = {
  title: "Keairan Citanduy — Platform Intelijen Hidrologi Terpadu WS Citanduy",
  description: "Platform intelijen hidrologi terpadu Wilayah Sungai Citanduy. Peta pantau banjir, kalender tani mikro, AquaAlert tambak, dan otomasi Hydro-AMDAL.",
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <MSWProvider>
          <Masthead />
          <main>{children}</main>
          <Footer />
        </MSWProvider>
      </body>
    </html>
  );
}
