import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeeCare Medical Centre | Healthcare with you in mind",
  description:
    "Discover thoughtful, patient-centred healthcare at FeeCare Medical Centre. Explore our services and request an appointment.",
  applicationName: "FeeCare Medical Centre",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
