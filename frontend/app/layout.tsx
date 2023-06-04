"use client";
import "regenerator-runtime/runtime";
import Header from "./components/Header/Header";

import "./globals.css";
import { Inter } from "next/font/google";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useAppSelector } from "./hooks/useAppSelector";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const ReduxComponent: React.FC<{ children: any }> = ({ children }) => {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxComponent>{children}</ReduxComponent>
      </body>
    </html>
  );
}
