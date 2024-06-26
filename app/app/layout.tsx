import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import UserProvider from "../providers/provider";
import { Auth0Provider } from "@auth0/auth0-react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban App",
  description: "next rails kanban app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <UserProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
