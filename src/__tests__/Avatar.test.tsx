import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, defaultConfig, generateRandomConfig } from "../components/Avatar";
import { BACKGROUNDS, SKINS, TSHIRTS, EXPRESSIONS, HAIRS } from "../types";

describe("Avatar", () => {
  describe("rendering", () => {
    it("should render an SVG element", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should have correct viewBox", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("viewBox", "0 0 474 474");
    });

    it("should have correct namespace", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    });
  });

  describe("size prop", () => {
    it("should use default size of 200", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "200");
      expect(svg).toHaveAttribute("height", "200");
    });

    it("should use custom size when provided", () => {
      const { container } = render(<Avatar size={150} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "150");
      expect(svg).toHaveAttribute("height", "150");
    });

    it("should accept size of 0", () => {
      const { container } = render(<Avatar size={0} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "0");
      expect(svg).toHaveAttribute("height", "0");
    });

    it("should accept large sizes", () => {
      const { container } = render(<Avatar size={1000} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "1000");
      expect(svg).toHaveAttribute("height", "1000");
    });
  });

  describe("className and style props", () => {
    it("should apply className to SVG", () => {
      const { container } = render(<Avatar className="my-avatar" />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveClass("my-avatar");
    });

    it("should apply style to SVG", () => {
      const { container } = render(<Avatar style={{ opacity: 0.5 }} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveStyle({ opacity: "0.5" });
    });

    it("should apply both className and style", () => {
      const { container } = render(
        <Avatar className="test-class" style={{ margin: "10px" }} />,
      );
      const svg = container.querySelector("svg");

      expect(svg).toHaveClass("test-class");
      expect(svg).toHaveStyle({ margin: "10px" });
    });
  });

  describe("avatar configuration props", () => {
    it("should render with all background options", () => {
      BACKGROUNDS.forEach((bg) => {
        const { container, unmount } = render(<Avatar background={bg} />);
        const svg = container.querySelector("svg");

        expect(svg).toBeInTheDocument();
        unmount();
      });
    });

    it("should render with all skin options", () => {
      SKINS.forEach((skin) => {
        const { container, unmount } = render(<Avatar skin={skin} />);
        const svg = container.querySelector("svg");

        expect(svg).toBeInTheDocument();
        unmount();
      });
    });

    it("should render with all tshirt options", () => {
      TSHIRTS.forEach((tshirt) => {
        const { container, unmount } = render(<Avatar tshirt={tshirt} />);
        const svg = container.querySelector("svg");

        expect(svg).toBeInTheDocument();
        unmount();
      });
    });

    it("should render with all expression options", () => {
      EXPRESSIONS.forEach((expression) => {
        const { container, unmount } = render(<Avatar expression={expression} />);
        const svg = container.querySelector("svg");

        expect(svg).toBeInTheDocument();
        unmount();
      });
    });

    it("should render with all hair options", () => {
      HAIRS.forEach((hair) => {
        const { container, unmount } = render(<Avatar hair={hair} />);
        const svg = container.querySelector("svg");

        expect(svg).toBeInTheDocument();
        unmount();
      });
    });

    it("should render with custom combination", () => {
      const { container } = render(
        <Avatar
          background="coralRed"
          skin="softPeach"
          tshirt="green"
          expression="laughing"
          hair="spaceBuns"
        />,
      );
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });
  });

  describe("SVG structure", () => {
    it("should contain clip path definition", () => {
      const { container } = render(<Avatar />);
      const clipPath = container.querySelector("clipPath");

      expect(clipPath).toBeInTheDocument();
      expect(clipPath).toHaveAttribute("id", "avatarClip");
    });

    it("should contain clipped group", () => {
      const { container } = render(<Avatar />);
      const group = container.querySelector('g[clip-path="url(#avatarClip)"]');

      expect(group).toBeInTheDocument();
    });
  });
});

describe("defaultConfig", () => {
  it("should have all required properties", () => {
    expect(defaultConfig).toHaveProperty("background");
    expect(defaultConfig).toHaveProperty("skin");
    expect(defaultConfig).toHaveProperty("tshirt");
    expect(defaultConfig).toHaveProperty("expression");
    expect(defaultConfig).toHaveProperty("hair");
  });

  it("should have valid background value", () => {
    expect(BACKGROUNDS).toContain(defaultConfig.background);
  });

  it("should have valid skin value", () => {
    expect(SKINS).toContain(defaultConfig.skin);
  });

  it("should have valid tshirt value", () => {
    expect(TSHIRTS).toContain(defaultConfig.tshirt);
  });

  it("should have valid expression value", () => {
    expect(EXPRESSIONS).toContain(defaultConfig.expression);
  });

  it("should have valid hair value", () => {
    expect(HAIRS).toContain(defaultConfig.hair);
  });

  it("should have expected default values", () => {
    expect(defaultConfig.background).toBe("babyBlue");
    expect(defaultConfig.skin).toBe("softPeach");
    expect(defaultConfig.tshirt).toBe("orange");
    expect(defaultConfig.expression).toBe("happy");
    expect(defaultConfig.hair).toBe("shortBuzz");
  });
});

describe("generateRandomConfig", () => {
  it("should return a config object with all properties", () => {
    const config = generateRandomConfig();

    expect(config).toHaveProperty("background");
    expect(config).toHaveProperty("skin");
    expect(config).toHaveProperty("tshirt");
    expect(config).toHaveProperty("expression");
    expect(config).toHaveProperty("hair");
  });

  it("should return valid background value", () => {
    const config = generateRandomConfig();
    expect(BACKGROUNDS).toContain(config.background);
  });

  it("should return valid skin value", () => {
    const config = generateRandomConfig();
    expect(SKINS).toContain(config.skin);
  });

  it("should return valid tshirt value", () => {
    const config = generateRandomConfig();
    expect(TSHIRTS).toContain(config.tshirt);
  });

  it("should return valid expression value", () => {
    const config = generateRandomConfig();
    expect(EXPRESSIONS).toContain(config.expression);
  });

  it("should return valid hair value", () => {
    const config = generateRandomConfig();
    expect(HAIRS).toContain(config.hair);
  });

  it("should generate different configs (with high probability)", () => {
    const configs = Array.from({ length: 10 }, () => generateRandomConfig());
    const uniqueConfigs = new Set(configs.map((c) => JSON.stringify(c)));

    // With so many options, we should get mostly unique configs
    expect(uniqueConfigs.size).toBeGreaterThan(1);
  });

  it("should be usable with Avatar component", () => {
    const config = generateRandomConfig();
    const { container } = render(<Avatar {...config} />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
  });
});
