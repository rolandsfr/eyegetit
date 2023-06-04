"use client";
import "regenerator-runtime/runtime";
import Header from "./components/Header/Header";

import "./globals.css";
import { Inter } from "next/font/google";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Preloader from "./components/Preloader/Preloader";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const ReduxComponent: React.FC<{ children: any }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);
  return (
    <>
      <Preloader loading={loading} />
      {loading || (
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      )}
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/listening");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body
        style={{
          paddingBottom: "8em",
        }}
        className={inter.className}
      >
        <ReduxComponent>{children}</ReduxComponent>
      </body>
    </html>
  );
}
