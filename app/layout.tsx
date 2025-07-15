import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clima Tempo",
  description: "Aplicativo de previsão do tempo em tempo real",
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${montserrat.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
