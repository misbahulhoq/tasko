"use client";

import Footer from "@/components/shared/Footer";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      {children}
      <Footer />
    </Provider>
  );
};

export default ReduxProvider;
