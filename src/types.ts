/**
 * Available background color options for the avatar.
 * @example 'babyBlue' | 'coralRed' | 'mintGreen'
 */
export type BackgroundType =
  | 'babyBlue' | 'coralRed' | 'darkGray' | 'lightGray'
  | 'mintGreen' | 'pastelGreen' | 'peach' | 'softPink';

/**
 * Available skin tone options for the avatar.
 * @example 'softPeach' | 'warmBrown' | 'deepBrown'
 */
export type SkinType =
  | 'deepBrown' | 'warmBrown' | 'mediumTan' | 'softPeach' | 'lightCream';

/**
 * Available t-shirt color options for the avatar.
 * @example 'orange' | 'blue' | 'green'
 */
export type TshirtType =
  | 'amber' | 'blue' | 'charcoal' | 'green' | 'orange'
  | 'pink' | 'raspberry' | 'white' | 'yellow';

/**
 * Available facial expression options for the avatar.
 * @example 'happy' | 'excited' | 'sleepy'
 */
export type ExpressionType =
  | 'angry' | 'blissful' | 'content' | 'dizzy' | 'excited'
  | 'furious' | 'happy' | 'playful' | 'sad' | 'sideGlance'
  | 'skeptical' | 'sleepy' | 'suspicious' | 'wink';

/**
 * Available hairstyle options for the avatar.
 * @example 'shortBuzz' | 'longStraight' | 'spaceBuns'
 */
export type HairType =
  | 'afroPuffs' | 'asymmetricBuns' | 'bob' | 'bobSidePart' | 'bowlCut'
  | 'braids' | 'bunnyEars' | 'curlyHeadband' | 'curlyMessy' | 'curlyPigtails'
  | 'curlyPuff' | 'fullCurly' | 'longAfro' | 'longPeak' | 'longStraight'
  | 'messyArtistic' | 'pigtailBuns' | 'shortBuns' | 'shortBuzz' | 'shortCurly'
  | 'sideBangs' | 'spaceBuns' | 'spikyEarmuffs' | 'tinyBun' | 'topKnot'
  | 'wavyCenterPart' | 'wavyPuffs';

/**
 * Complete configuration object for an avatar's appearance.
 * Contains all customizable attributes: background, skin, tshirt, expression, and hair.
 *
 * @example
 * ```tsx
 * const config: AvatarConfig = {
 *   background: 'mintGreen',
 *   skin: 'softPeach',
 *   tshirt: 'blue',
 *   expression: 'happy',
 *   hair: 'shortBuzz'
 * };
 * ```
 */
export interface AvatarConfig {
  /** Background color of the avatar circle */
  background: BackgroundType;
  /** Skin tone of the avatar character */
  skin: SkinType;
  /** T-shirt color of the avatar character */
  tshirt: TshirtType;
  /** Facial expression of the avatar character */
  expression: ExpressionType;
  /** Hairstyle of the avatar character */
  hair: HairType;
}

/**
 * Props for the Avatar component.
 * All avatar configuration properties are optional and will use defaults if not provided.
 *
 * @example
 * ```tsx
 * <Avatar size={100} background="mintGreen" expression="happy" />
 * ```
 */
export interface AvatarProps extends Partial<AvatarConfig> {
  /** Size of the avatar in pixels. @default 200 */
  size?: number;
  /** Optional CSS class name for the SVG element */
  className?: string;
  /** Optional inline styles for the SVG element */
  style?: React.CSSProperties;
}

/**
 * Props for the AvatarPicker component.
 * A controlled/uncontrolled component for selecting avatar attributes.
 *
 * @example
 * ```tsx
 * <AvatarPicker
 *   value={avatarConfig}
 *   onChange={(config) => setAvatarConfig(config)}
 * />
 * ```
 */
export interface AvatarPickerProps {
  /** Current avatar configuration (for controlled mode) */
  value?: AvatarConfig;
  /** Callback fired when avatar configuration changes */
  onChange?: (config: AvatarConfig) => void;
  /** Optional CSS class name for the picker container */
  className?: string;
}

/** Array of all available background color options */
export const BACKGROUNDS: BackgroundType[] = [
  'babyBlue', 'coralRed', 'darkGray', 'lightGray',
  'mintGreen', 'pastelGreen', 'peach', 'softPink'
];

/** Array of all available skin tone options */
export const SKINS: SkinType[] = [
  'deepBrown', 'warmBrown', 'mediumTan', 'softPeach', 'lightCream'
];

/** Array of all available t-shirt color options */
export const TSHIRTS: TshirtType[] = [
  'amber', 'blue', 'charcoal', 'green', 'orange',
  'pink', 'raspberry', 'white', 'yellow'
];

/** Array of all available facial expression options */
export const EXPRESSIONS: ExpressionType[] = [
  'angry', 'blissful', 'content', 'dizzy', 'excited',
  'furious', 'happy', 'playful', 'sad', 'sideGlance',
  'skeptical', 'sleepy', 'suspicious', 'wink'
];

/** Array of all available hairstyle options */
export const HAIRS: HairType[] = [
  'afroPuffs', 'asymmetricBuns', 'bob', 'bobSidePart', 'bowlCut',
  'braids', 'bunnyEars', 'curlyHeadband', 'curlyMessy', 'curlyPigtails',
  'curlyPuff', 'fullCurly', 'longAfro', 'longPeak', 'longStraight',
  'messyArtistic', 'pigtailBuns', 'shortBuns', 'shortBuzz', 'shortCurly',
  'sideBangs', 'spaceBuns', 'spikyEarmuffs', 'tinyBun', 'topKnot',
  'wavyCenterPart', 'wavyPuffs'
];
