import type { Metadata } from "next";
import { Livvic } from "next/font/google";
import "@/styles/globals.css";
import { CustomThemeProvider, StoreProvider } from "@/providers";
import NextTopLoader from "nextjs-toploader";
import { ToastUtils } from "@/utils";

const livvic = Livvic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-livvic",
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Smart Room Nepal",
  description: "Smart Room Nepal",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${livvic.className} antialiased bg-white dark:bg-dark`}
        >
          <div className="z-[999]">
            <NextTopLoader showSpinner={false} color="#3085DF" />
          </div>
          <CustomThemeProvider>{children}</CustomThemeProvider>
          <ToastUtils />
        </body>
      </html>
    </StoreProvider>
  );
}
