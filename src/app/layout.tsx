import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const getBaseUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "Reader DNA: คุณเป็นนักอ่านแบบไหน?",
  description: "แบบทดสอบ 24 ข้อ ที่จะบอกว่าคุณเป็นนักอ่านสายไหน — พร้อมแฉนิสัยการอ่านแบบเจ็บนิด ๆ แต่จริง",
  openGraph: {
    images: ['/api/og'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="th">
      <body>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
