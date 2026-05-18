import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quran Mazid",
  description: "Read, Study, and Learn The Quran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Amiri+Quran&family=Scheherazade+New:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body className="flex h-screen w-full antialiased text-sm md:text-base select-none overflow-hidden bg-qmBgMain">
        {children}
      </body>
    </html>
  );
}
