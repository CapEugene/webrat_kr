import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebRat",
  description: "Сайт для оценивания видеоигр",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
      <body className={`min-h-screen w-full bg-white ${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}
