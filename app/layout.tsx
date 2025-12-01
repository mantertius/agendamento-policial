import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polícia Civil AL - Sistema de Agendamento",
  description: "Sistema de agendamento de atendimento - Polícia Civil de Alagoas",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
