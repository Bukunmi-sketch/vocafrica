import { describe, it, expect } from "vitest";
import { getFolderColorClass, getCleanFileName } from "@/hooks/folderColor";

describe("folderColor", () => {
  describe("getFolderColorClass", () => {
    it("returns tailwind class for known color", () => {
      expect(getFolderColorClass("green")).toBe("text-green-500");
      expect(getFolderColorClass("red")).toBe("text-red-500");
      expect(getFolderColorClass("blue")).toBe("text-blue-500");
    });

    it("returns text-gray-800 for black", () => {
      expect(getFolderColorClass("black")).toBe("text-gray-800");
    });

    it("returns text-gray-800 for undefined or unknown", () => {
      expect(getFolderColorClass(undefined)).toBe("text-gray-800");
      expect(getFolderColorClass("unknown" as any)).toBe("text-gray-800");
    });
  });

  describe("getCleanFileName", () => {
    it("returns last segment of path", () => {
      expect(getCleanFileName("a/b/c/file.pdf")).toBe("file.pdf");
    });

    it("decodes URI component", () => {
      expect(getCleanFileName("folder/file%20name.txt")).toBe("file name.txt");
    });

    it("returns - when path is empty or no segment", () => {
      expect(getCleanFileName("")).toBe("-");
    });
  });
});
