import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(true),
    })
  );
});

test("should render form correctly", () => {
  render(<App />);
  const label = screen.getByText("Enter GH API key:");
  expect(label).toBeInTheDocument();
});

test("should render error message when repos could not be fetched", async () => {
  render(<App />);
  const input = document.querySelector("input");
  fireEvent.change(input, { target: { value: "ghb_mock" } });
  fireEvent.click(document.querySelector("button"));
  //should render error as fetche is not mocked
  await waitFor(() => {
    const error = screen.queryByText("Enter a valid API key.");
    expect(error).toBeInTheDocument();
  });
});
