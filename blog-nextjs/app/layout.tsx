import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import React from "react";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "Example application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunitoSans.variable}`}>
      <body className="bg-white font-sans antialiased">
        <div className="container mx-auto">
          <div className={"p-3"}>{children}</div>
        </div>
        <div className="container mx-auto">
          <div className={"mb-4 mt-4 border-t-2 text-center"}>
            Blog Example, Next.js Edition
          </div>
        </div>
      </body>
    </html>
  );
}
