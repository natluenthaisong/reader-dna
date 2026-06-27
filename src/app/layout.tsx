import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reader DNA: คุณเป็นนักอ่านแบบไหน?",
  description: "แบบทดสอบ 24 ข้อ ที่จะบอกว่าคุณเป็นนักอ่านสายไหน — พร้อมแฉนิสัยการอ่านแบบเจ็บนิด ๆ แต่จริง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
