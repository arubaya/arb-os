import type { Metadata } from "next";
import { Geist, Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import StoreHydratedProvider from "@/components/hoc/StoreHydratedProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ArbOS",
  description:
    "Clone the iconic looks and vibes of Windows, macOS, or Linux. Launch your experience now!",
  icons: ["/logo-icon.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${inter.variable} ${ubuntu.variable} antialiased`}
      >
        <StoreHydratedProvider>{children}</StoreHydratedProvider>
      </body>
    </html>
  );
}
