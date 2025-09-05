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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content="#f3f4f6"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#101828"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="flex flex-col p-2">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
