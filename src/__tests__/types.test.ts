import { describe, it, expect } from "vitest";
import {
  BACKGROUNDS,
  SKINS,
  TSHIRTS,
  EXPRESSIONS,
  HAIRS,
  BackgroundType,
  SkinType,
  TshirtType,
  ExpressionType,
  HairType,
} from "../types";

describe("Constants", () => {
  describe("BACKGROUNDS", () => {
    it("should be a non-empty array", () => {
      expect(Array.isArray(BACKGROUNDS)).toBe(true);
      expect(BACKGROUNDS.length).toBeGreaterThan(0);
    });

    it("should have 8 background options", () => {
      expect(BACKGROUNDS).toHaveLength(8);
    });

    it("should contain expected values", () => {
      const expected: BackgroundType[] = [
        "babyBlue",
        "coralRed",
        "darkGray",
        "lightGray",
        "mintGreen",
        "pastelGreen",
        "peach",
        "softPink",
      ];
      expect(BACKGROUNDS).toEqual(expected);
    });

    it("should have all unique values", () => {
      const uniqueValues = new Set(BACKGROUNDS);
      expect(uniqueValues.size).toBe(BACKGROUNDS.length);
    });
  });

  describe("SKINS", () => {
    it("should be a non-empty array", () => {
      expect(Array.isArray(SKINS)).toBe(true);
      expect(SKINS.length).toBeGreaterThan(0);
    });

    it("should have 1 skin option", () => {
      expect(SKINS).toHaveLength(1);
    });

    it("should contain expected values", () => {
      const expected: SkinType[] = ["softPeach"];
      expect(SKINS).toEqual(expected);
    });
  });

  describe("TSHIRTS", () => {
    it("should be a non-empty array", () => {
      expect(Array.isArray(TSHIRTS)).toBe(true);
      expect(TSHIRTS.length).toBeGreaterThan(0);
    });

    it("should have 9 tshirt options", () => {
      expect(TSHIRTS).toHaveLength(9);
    });

    it("should contain expected values", () => {
      const expected: TshirtType[] = [
        "amber",
        "blue",
        "charcoal",
        "green",
        "orange",
        "pink",
        "raspberry",
        "white",
        "yellow",
      ];
      expect(TSHIRTS).toEqual(expected);
    });

    it("should have all unique values", () => {
      const uniqueValues = new Set(TSHIRTS);
      expect(uniqueValues.size).toBe(TSHIRTS.length);
    });
  });

  describe("EXPRESSIONS", () => {
    it("should be a non-empty array", () => {
      expect(Array.isArray(EXPRESSIONS)).toBe(true);
      expect(EXPRESSIONS.length).toBeGreaterThan(0);
    });

    it("should have 13 expression options", () => {
      expect(EXPRESSIONS).toHaveLength(13);
    });

    it("should contain expected values", () => {
      const expected: ExpressionType[] = [
        "angry",
        "focused",
        "furious",
        "happy",
        "laughing",
        "sad",
        "shocked",
        "sideGlance",
        "sleepy",
        "starry",
        "suspicious",
        "tired",
        "worried",
      ];
      expect(EXPRESSIONS).toEqual(expected);
    });

    it("should have all unique values", () => {
      const uniqueValues = new Set(EXPRESSIONS);
      expect(uniqueValues.size).toBe(EXPRESSIONS.length);
    });
  });

  describe("HAIRS", () => {
    it("should be a non-empty array", () => {
      expect(Array.isArray(HAIRS)).toBe(true);
      expect(HAIRS.length).toBeGreaterThan(0);
    });

    it("should have 27 hair options", () => {
      expect(HAIRS).toHaveLength(27);
    });

    it("should contain expected values", () => {
      const expected: HairType[] = [
        "afroPuffs",
        "asymmetricBuns",
        "bob",
        "bobSidePart",
        "bowlCut",
        "braids",
        "bunnyEars",
        "curlyHeadband",
        "curlyMessy",
        "curlyPigtails",
        "curlyPuff",
        "fullCurly",
        "longAfro",
        "longPeak",
        "longStraight",
        "messyArtistic",
        "pigtailBuns",
        "shortBuns",
        "shortBuzz",
        "shortCurly",
        "sideBangs",
        "spaceBuns",
        "spikyEarmuffs",
        "tinyBun",
        "topKnot",
        "wavyCenterPart",
        "wavyPuffs",
      ];
      expect(HAIRS).toEqual(expected);
    });

    it("should have all unique values", () => {
      const uniqueValues = new Set(HAIRS);
      expect(uniqueValues.size).toBe(HAIRS.length);
    });
  });

  describe("Total combinations", () => {
    it("should support a large number of avatar combinations", () => {
      const totalCombinations =
        BACKGROUNDS.length *
        SKINS.length *
        TSHIRTS.length *
        EXPRESSIONS.length *
        HAIRS.length;

      // 8 * 1 * 9 * 13 * 27 = 25,272 combinations
      expect(totalCombinations).toBe(25272);
    });
  });
});
