import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Modal from "../components/Modal";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban App",
  description: "next rails kanban app",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
