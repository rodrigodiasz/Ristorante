import { render, screen } from "@testing-library/react";
import { Button } from "./button";

// Mock das dependências
jest.mock("@radix-ui/react-slot", () => ({
  Slot: ({ children, ...props }: any) => (
    <div data-testid="slot" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("@/lib/utils", () => ({
  cn: (...inputs: any[]) => inputs.join(" "),
}));

describe("Button Component", () => {
  it("renders button with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders as Slot when asChild is true", () => {
    render(<Button asChild>Click me</Button>);
    const slot = screen.getByTestId("slot");
    expect(slot).toBeInTheDocument();
    expect(slot).toHaveTextContent("Click me");
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Danger</Button>);
    const button = screen.getByRole("button", { name: /danger/i });
    expect(button).toHaveClass("bg-destructive");
  });
});
