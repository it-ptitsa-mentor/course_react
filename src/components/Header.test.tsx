import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeProvider";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header — переключение темы", () => {
  let container: HTMLElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    const rendered = render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    );

    container = rendered.container;
    button = screen.getByLabelText("toggle-theme");
  });

  it("по умолчанию отображается светлая тема", () => {
    expect(button).toHaveTextContent("Dark Mode");
    expect(container.querySelector(".theme-light")).toBeInTheDocument();
  });

  it("переключается на тёмную тему по клику", () => {
    fireEvent.click(button);

    expect(button).toHaveTextContent("Light Mode");
    expect(container.querySelector(".theme-dark")).toBeInTheDocument();
    expect(container.querySelector(".theme-light")).not.toBeInTheDocument();
  });

  it("возвращается к светлой теме при повторном клике", () => {
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveTextContent("Dark Mode");
    expect(container.querySelector(".theme-light")).toBeInTheDocument();
  });
});
