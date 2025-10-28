import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IT Toolkit - Bilgi İşlem Araçları Koleksiyonu",
  description: "Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon için kullanıma hazır Python ve Batch scriptleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
