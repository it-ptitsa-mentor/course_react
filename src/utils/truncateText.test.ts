import { expect } from "vitest";
import { describe, it } from "vitest";
import { trancateText } from "./trancateText";

describe("truncateText", () => {
  it("should truncate text longer than max length and add ellipsis", () => {
    const result = trancateText(
      "This is a long text that should be truncated",
      10,
    );

    expect(result).toBe("This is a...");
  });

  it("should return original text if it is shorter than max length", () => {
    expect(trancateText("Hello", 50)).toBe("Hello");
  });

  it("should return empty string for empty or falsy text", () => {
    expect(trancateText("", 10)).toBe("");
    expect(trancateText(null as unknown as string)).toBe("");
    expect(trancateText(undefined as unknown as string)).toBe("");
  });
});
