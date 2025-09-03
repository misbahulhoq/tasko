import AppProvider from "@/app/AppProvicer";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

const customRender = (
  ui: ReactElement,
  options: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AppProvider, ...options });
