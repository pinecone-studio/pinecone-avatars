// Components
export {
  Avatar,
  generateRandomConfig,
  defaultConfig,
} from "./components/Avatar";
export { AvatarPicker } from "./components/AvatarPicker";

// Export utilities
export {
  generateSvg,
  generateBase64,
  generatePngBase64,
  downloadSvg,
  downloadPng,
} from "./utils/export";

// Types
export type {
  AvatarConfig,
  AvatarProps,
  AvatarPickerProps,
  BackgroundType,
  SkinType,
  TshirtType,
  ExpressionType,
  HairType,
} from "./types";

// Constants
export { BACKGROUNDS, SKINS, TSHIRTS, EXPRESSIONS, HAIRS } from "./types";
