import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Berin & Burak | Düğün Davetiyesi",
  description: "13 Haziran 2026 tarihindeki düğünümüze davetlisiniz.",
  openGraph: {
    title: "Berin & Burak | Evleniyoruz!",
    description: "Hayatımızın en özel gününde sizi de aramızda görmekten mutluluk duyarız.",
    images: [{ url: "/wedding-hero.jpg" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-screen bg-surface font-body text-on-surface selection:bg-primary-container">
        {children}
      </body>
    </html>
  );
}
