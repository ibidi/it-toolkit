import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "IT Toolkit - Bilgi İşlem Araçları Koleksiyonu",
    template: "%s | IT Toolkit"
  },
  description: "Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon için kullanıma hazır Python ve Batch scriptleri koleksiyonu. Modern, açık kaynak IT araçları.",
  keywords: [
    "IT tools",
    "network tools",
    "system tools",
    "security tools",
    "automation",
    "python scripts",
    "batch scripts",
    "bilgi işlem araçları",
    "ağ yönetimi",
    "sistem kontrolü",
    "güvenlik testleri",
    "otomasyon araçları"
  ],
  authors: [{ name: "İhsan Baki Doğan", url: "https://ihsanbakidogan.com" }],
  creator: "İhsan Baki Doğan",
  publisher: "İhsan Baki Doğan",
  metadataBase: new URL('https://it.socialin.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://it.socialin.net',
    title: 'IT Toolkit - Bilgi İşlem Araçları Koleksiyonu',
    description: 'Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon için kullanıma hazır Python ve Batch scriptleri',
    siteName: 'IT Toolkit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Toolkit - Bilgi İşlem Araçları Koleksiyonu',
    description: 'Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon için kullanıma hazır Python ve Batch scriptleri',
    creator: '@ibidicodes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
