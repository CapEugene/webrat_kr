import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";

const geistRaleway = Raleway({
  variable: "--font-geist-raleway",
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
    <html lang="en">
      <body className={"min-h-screen w-full bg-white" + geistRaleway.variable}>
        {children}
      </body>
    </html>
  );
}
