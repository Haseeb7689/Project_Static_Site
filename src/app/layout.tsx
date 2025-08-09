import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mujahid Jazzcash & Easypassa",
  description: "Mujahid Jazzcash & Easypassa",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
