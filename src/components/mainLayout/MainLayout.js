import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
