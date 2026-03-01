import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Congrats from "@/pages/authentication/Congrats";

describe("Congrats", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Congrats />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
