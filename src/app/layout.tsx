import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lensa A.i",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#624cf5' }
    }}>
    <html lang="en">
      <head>
      <link rel="icon" href="./assets/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
