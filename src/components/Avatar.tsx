import {
  AvatarProps,
  AvatarConfig,
  BACKGROUNDS,
  SKINS,
  TSHIRTS,
  EXPRESSIONS,
  HAIRS,
} from "../types";
import { backgroundComponents } from "./svg/background";
import { skinComponents } from "./svg/skin";
import { tshirtComponents } from "./svg/tshirt";
import { expressionComponents } from "./svg/expression";
import { hairComponents } from "./svg/hair";

/**
 * Default avatar configuration used when no props are provided.
 *
 * @example
 * ```tsx
 * import { defaultConfig } from 'chipmunk-avatars';
 * console.log(defaultConfig.background); // 'babyBlue'
 * ```
 */
export const defaultConfig: AvatarConfig = {
  background: "babyBlue",
  skin: "softPeach",
  tshirt: "orange",
  expression: "happy",
  hair: "shortBuzz",
};

/**
 * Renders a customizable chipmunk avatar as an SVG element.
 *
 * @param props - Avatar configuration and styling options
 * @param props.size - Size of the avatar in pixels (default: 200)
 * @param props.background - Background color (default: 'babyBlue')
 * @param props.skin - Skin tone (default: 'softPeach')
 * @param props.tshirt - T-shirt color (default: 'orange')
 * @param props.expression - Facial expression (default: 'happy')
 * @param props.hair - Hairstyle (default: 'shortBuzz')
 * @param props.className - Optional CSS class name
 * @param props.style - Optional inline styles
 * @returns SVG element rendering the avatar
 *
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <Avatar />
 *
 * // Custom avatar
 * <Avatar
 *   size={100}
 *   background="mintGreen"
 *   skin="warmBrown"
 *   expression="happy"
 *   hair="spaceBuns"
 * />
 * ```
 */
export function Avatar({
  size = 200,
  className,
  style,
  background = defaultConfig.background,
  skin = defaultConfig.skin,
  tshirt = defaultConfig.tshirt,
  expression = defaultConfig.expression,
  hair = defaultConfig.hair,
}: AvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 474 474"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <clipPath id="avatarClip">
          <circle cx="237" cy="237" r="237" />
        </clipPath>
      </defs>
      {/* Background (outside clip) */}
      {backgroundComponents[background]}
      {/* Clipped content */}
      <g clipPath="url(#avatarClip)">
        {tshirtComponents[tshirt]}
        {skinComponents[skin]}
        {hairComponents[hair]}
        {expressionComponents[expression]}
      </g>
    </svg>
  );
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random avatar configuration with randomly selected values
 * for all attributes (background, skin, tshirt, expression, hair).
 *
 * @returns A complete AvatarConfig with random values
 *
 * @example
 * ```tsx
 * import { Avatar, generateRandomConfig } from 'chipmunk-avatars';
 *
 * const randomAvatar = generateRandomConfig();
 * <Avatar {...randomAvatar} />
 * ```
 */
export function generateRandomConfig(): AvatarConfig {
  return {
    background: randomItem(BACKGROUNDS),
    skin: randomItem(SKINS),
    tshirt: randomItem(TSHIRTS),
    expression: randomItem(EXPRESSIONS),
    hair: randomItem(HAIRS),
  };
}
