import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AvatarPicker } from "../components/AvatarPicker";
import { AvatarConfig, BACKGROUNDS, TSHIRTS, EXPRESSIONS, HAIRS } from "../types";
import { defaultConfig } from "../components/Avatar";

describe("AvatarPicker", () => {
  describe("rendering", () => {
    it("should render the picker container", () => {
      const { container } = render(<AvatarPicker />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render all category labels", () => {
      render(<AvatarPicker />);

      expect(screen.getByText("Background")).toBeInTheDocument();
      expect(screen.getByText("Skin")).toBeInTheDocument();
      expect(screen.getByText("T-Shirt")).toBeInTheDocument();
      expect(screen.getByText("Expression")).toBeInTheDocument();
      expect(screen.getByText("Hair")).toBeInTheDocument();
    });

    it("should render randomize button", () => {
      render(<AvatarPicker />);

      expect(
        screen.getByRole("button", { name: /randomize/i }),
      ).toBeInTheDocument();
    });

    it("should apply className when provided", () => {
      const { container } = render(<AvatarPicker className="custom-class" />);

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("option buttons", () => {
    it("should render background options", () => {
      render(<AvatarPicker />);

      BACKGROUNDS.forEach((bg) => {
        expect(screen.getByTitle(bg)).toBeInTheDocument();
      });
    });

    it("should render tshirt options", () => {
      render(<AvatarPicker />);

      TSHIRTS.forEach((tshirt) => {
        expect(screen.getByTitle(tshirt)).toBeInTheDocument();
      });
    });

    it("should render expression options", () => {
      render(<AvatarPicker />);

      EXPRESSIONS.forEach((expression) => {
        expect(screen.getByTitle(expression)).toBeInTheDocument();
      });
    });

    it("should render hair options", () => {
      render(<AvatarPicker />);

      HAIRS.forEach((hair) => {
        expect(screen.getByTitle(hair)).toBeInTheDocument();
      });
    });
  });

  describe("uncontrolled mode", () => {
    it("should use default config initially", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      // Click a different background to trigger onChange
      fireEvent.click(screen.getByTitle("coralRed"));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          background: "coralRed",
          skin: defaultConfig.skin,
          tshirt: defaultConfig.tshirt,
          expression: defaultConfig.expression,
          hair: defaultConfig.hair,
        }),
      );
    });

    it("should update internal state when options are clicked", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByTitle("mintGreen"));
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ background: "mintGreen" }),
      );

      fireEvent.click(screen.getByTitle("blue"));
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ tshirt: "blue" }),
      );
    });
  });

  describe("controlled mode", () => {
    it("should use provided value", () => {
      const customConfig: AvatarConfig = {
        background: "coralRed",
        skin: "softPeach",
        tshirt: "green",
        expression: "laughing",
        hair: "spaceBuns",
      };

      const onChange = vi.fn();
      render(<AvatarPicker value={customConfig} onChange={onChange} />);

      // Click a different option
      fireEvent.click(screen.getByTitle("mintGreen"));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          background: "mintGreen",
          tshirt: "green", // Should preserve other values
          expression: "laughing",
          hair: "spaceBuns",
        }),
      );
    });

    it("should sync when value prop changes", () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <AvatarPicker value={defaultConfig} onChange={onChange} />,
      );

      const newConfig: AvatarConfig = {
        background: "peach",
        skin: "softPeach",
        tshirt: "pink",
        expression: "happy",
        hair: "bob",
      };

      rerender(<AvatarPicker value={newConfig} onChange={onChange} />);

      // Click something to verify state was updated
      fireEvent.click(screen.getByTitle("coralRed"));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          background: "coralRed",
          tshirt: "pink", // Should have been synced from new value
          hair: "bob",
        }),
      );
    });
  });

  describe("onChange callback", () => {
    it("should call onChange when background is changed", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByTitle("peach"));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ background: "peach" }),
      );
    });

    it("should call onChange when tshirt is changed", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByTitle("charcoal"));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ tshirt: "charcoal" }),
      );
    });

    it("should call onChange when expression is changed", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByTitle("sleepy"));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ expression: "sleepy" }),
      );
    });

    it("should call onChange when hair is changed", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByTitle("braids"));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ hair: "braids" }),
      );
    });

    it("should not throw when onChange is not provided", () => {
      render(<AvatarPicker />);

      expect(() => {
        fireEvent.click(screen.getByTitle("coralRed"));
      }).not.toThrow();
    });
  });

  describe("randomize button", () => {
    it("should call onChange with random config when clicked", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByRole("button", { name: /randomize/i }));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          background: expect.any(String),
          skin: expect.any(String),
          tshirt: expect.any(String),
          expression: expect.any(String),
          hair: expect.any(String),
        }),
      );
    });

    it("should generate valid random config", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      fireEvent.click(screen.getByRole("button", { name: /randomize/i }));

      const config = onChange.mock.calls[0][0] as AvatarConfig;

      expect(BACKGROUNDS).toContain(config.background);
      expect(TSHIRTS).toContain(config.tshirt);
      expect(EXPRESSIONS).toContain(config.expression);
      expect(HAIRS).toContain(config.hair);
    });

    it("should update internal state when randomized", () => {
      const onChange = vi.fn();
      render(<AvatarPicker onChange={onChange} />);

      // Click randomize
      fireEvent.click(screen.getByRole("button", { name: /randomize/i }));
      const randomConfig = onChange.mock.calls[0][0] as AvatarConfig;

      // Now click a specific option
      fireEvent.click(screen.getByTitle("coralRed"));

      // Should preserve random config except for the changed property
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          background: "coralRed",
          tshirt: randomConfig.tshirt,
          expression: randomConfig.expression,
          hair: randomConfig.hair,
        }),
      );
    });
  });

  describe("accessibility", () => {
    it("should have button type on all option buttons", () => {
      render(<AvatarPicker />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("type", "button");
      });
    });

    it("should have title attributes on option buttons", () => {
      render(<AvatarPicker />);

      // Check a few representative options
      expect(screen.getByTitle("babyBlue")).toBeInTheDocument();
      expect(screen.getByTitle("happy")).toBeInTheDocument();
      expect(screen.getByTitle("shortBuzz")).toBeInTheDocument();
    });
  });
});
