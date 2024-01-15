import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomerServiceChat from "../components/CustomerServiceChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot for your store",
  description: "Your future customer's best tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomerServiceChat />
        {children}
      </body>
    </html>
  );
}
