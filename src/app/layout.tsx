import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "KROK Tests",
  description: "Prepare for your Tests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col p-2">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
