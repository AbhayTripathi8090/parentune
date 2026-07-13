import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the blog page header", () => {
  render(<App />);
  expect(screen.getByText(/blogs and vlogs/i)).toBeInTheDocument();
});
