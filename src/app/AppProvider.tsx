"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import UserProvider from "./providers/UserProvider";

interface ReduxProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      <UserProvider />
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
};

export default AppProvider;
