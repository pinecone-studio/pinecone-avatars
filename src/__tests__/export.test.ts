import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  generateSvg,
  generateBase64,
  generatePngBase64,
  downloadSvg,
  downloadPng,
} from "../utils/export";
import { AvatarConfig } from "../types";

const testConfig: AvatarConfig = {
  background: "mintGreen",
  skin: "softPeach",
  tshirt: "blue",
  expression: "happy",
  hair: "shortBuzz",
};

describe("generateSvg", () => {
  it("should generate valid SVG markup", () => {
    const svg = generateSvg(testConfig);

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain('viewBox="0 0 474 474"');
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it("should use default size of 474", () => {
    const svg = generateSvg(testConfig);

    expect(svg).toContain('width="474"');
    expect(svg).toContain('height="474"');
  });

  it("should use custom size when provided", () => {
    const svg = generateSvg(testConfig, 200);

    expect(svg).toContain('width="200"');
    expect(svg).toContain('height="200"');
  });

  it("should use default config when no config provided", () => {
    const svg = generateSvg();

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });

  it("should merge partial config with defaults", () => {
    const svg = generateSvg({ background: "coralRed" });

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });

  it("should include clip path for avatar circle", () => {
    const svg = generateSvg(testConfig);

    expect(svg).toContain('<clipPath id="avatarClip">');
    expect(svg).toContain('<circle cx="237" cy="237" r="237"/>');
  });
});

describe("generateBase64", () => {
  it("should return a valid base64 data URL", () => {
    const dataUrl = generateBase64(testConfig);

    expect(dataUrl).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it("should use default size when not provided", () => {
    const dataUrl = generateBase64(testConfig);
    const base64Part = dataUrl.split(",")[1];
    const decoded = atob(base64Part);

    expect(decoded).toContain('width="474"');
    expect(decoded).toContain('height="474"');
  });

  it("should use custom size when provided", () => {
    const dataUrl = generateBase64(testConfig, 100);
    const base64Part = dataUrl.split(",")[1];
    const decoded = atob(base64Part);

    expect(decoded).toContain('width="100"');
    expect(decoded).toContain('height="100"');
  });

  it("should use default config when no config provided", () => {
    const dataUrl = generateBase64();

    expect(dataUrl).toMatch(/^data:image\/svg\+xml;base64,/);
  });
});

describe("generatePngBase64", () => {
  let originalWindow: typeof globalThis.window;

  beforeEach(() => {
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it("should throw error in non-browser environment", async () => {
    // Simulate Node.js environment
    const windowDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "window",
    );
    // @ts-expect-error - intentionally setting window to undefined
    delete globalThis.window;

    await expect(generatePngBase64(testConfig)).rejects.toThrow(
      "generatePngBase64 is only available in browser environment",
    );

    // Restore window
    if (windowDescriptor) {
      Object.defineProperty(globalThis, "window", windowDescriptor);
    }
  });
});

describe("downloadSvg", () => {
  let originalWindow: typeof globalThis.window;

  beforeEach(() => {
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it("should throw error in non-browser environment", () => {
    const windowDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "window",
    );
    // @ts-expect-error - intentionally setting window to undefined
    delete globalThis.window;

    expect(() => downloadSvg(testConfig)).toThrow(
      "downloadSvg is only available in browser environment",
    );

    if (windowDescriptor) {
      Object.defineProperty(globalThis, "window", windowDescriptor);
    }
  });

  it("should create and trigger download in browser environment", () => {
    const mockClick = vi.fn();
    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();
    const mockCreateObjectURL = vi.fn(() => "blob:mock-url");
    const mockRevokeObjectURL = vi.fn();

    const mockAnchor = {
      href: "",
      download: "",
      click: mockClick,
    };

    vi.spyOn(document, "createElement").mockReturnValue(
      mockAnchor as unknown as HTMLAnchorElement,
    );
    vi.spyOn(document.body, "appendChild").mockImplementation(mockAppendChild);
    vi.spyOn(document.body, "removeChild").mockImplementation(mockRemoveChild);
    vi.spyOn(URL, "createObjectURL").mockImplementation(mockCreateObjectURL);
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(mockRevokeObjectURL);

    downloadSvg(testConfig, "test-avatar.svg");

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockAnchor.download).toBe("test-avatar.svg");
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:mock-url");

    vi.restoreAllMocks();
  });

  it("should use default filename when not provided", () => {
    const mockAnchor = {
      href: "",
      download: "",
      click: vi.fn(),
    };

    vi.spyOn(document, "createElement").mockReturnValue(
      mockAnchor as unknown as HTMLAnchorElement,
    );
    vi.spyOn(document.body, "appendChild").mockImplementation(() => null as unknown as HTMLAnchorElement);
    vi.spyOn(document.body, "removeChild").mockImplementation(() => null as unknown as HTMLAnchorElement);
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

    downloadSvg(testConfig);

    expect(mockAnchor.download).toBe("avatar.svg");

    vi.restoreAllMocks();
  });
});

describe("downloadPng", () => {
  let originalWindow: typeof globalThis.window;

  beforeEach(() => {
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it("should throw error in non-browser environment", async () => {
    const windowDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "window",
    );
    // @ts-expect-error - intentionally setting window to undefined
    delete globalThis.window;

    await expect(downloadPng(testConfig)).rejects.toThrow(
      "downloadPng is only available in browser environment",
    );

    if (windowDescriptor) {
      Object.defineProperty(globalThis, "window", windowDescriptor);
    }
  });
});
