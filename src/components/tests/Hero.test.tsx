import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../home/Hero";

test("Hero section contents.", () => {
  render(<Hero />);
  expect(screen.get);
});
