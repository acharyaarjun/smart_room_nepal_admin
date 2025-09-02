import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import { CustomThemeProvider, StoreProvider } from "@/providers";
import NextTopLoader from "nextjs-toploader";
import { ToastUtils } from "@/utils";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
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
          className={`${outfit.className} antialiased bg-[#fcfcfc] dark:bg-darkbg`}
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
