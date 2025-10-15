import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meet AI",
  description: "MeetAI is a platform for AI-driven meetings",
  icons: {
    icon: "/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="en">
          <body
            className={`${inter.className} antialiased`}
          >
            <Toaster />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
