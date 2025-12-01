import { AvatarConfig } from '../types';
import { backgroundSvg } from '../components/svg/backgroundStrings';
import { skinSvg } from '../components/svg/skinStrings';
import { tshirtSvg } from '../components/svg/tshirtStrings';
import { expressionSvg } from '../components/svg/expressionStrings';
import { hairSvg } from '../components/svg/hairStrings';

const defaultConfig: AvatarConfig = {
  background: 'babyBlue',
  skin: 'softPeach',
  tshirt: 'orange',
  expression: 'happy',
  hair: 'shortBuzz'
};

/**
 * Generates the complete SVG markup string for an avatar.
 * Works in both browser and Node.js environments.
 *
 * @param config - Partial avatar configuration (missing values use defaults)
 * @param size - Width and height of the SVG in pixels (default: 474)
 * @returns Complete SVG markup as a string
 *
 * @example
 * ```ts
 * import { generateSvg } from 'chipmunk-avatars';
 *
 * const svg = generateSvg({ background: 'mintGreen', expression: 'happy' });
 * document.getElementById('container').innerHTML = svg;
 * ```
 */
export function generateSvg(config: Partial<AvatarConfig> = {}, size: number = 474): string {
  const merged = { ...defaultConfig, ...config };

  const background = backgroundSvg[merged.background] || '';
  const tshirt = tshirtSvg[merged.tshirt] || '';
  const skin = skinSvg[merged.skin] || '';
  const hair = hairSvg[merged.hair] || '';
  const expression = expressionSvg[merged.expression] || '';

  return `<svg width="${size}" height="${size}" viewBox="0 0 474 474" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="avatarClip"><circle cx="237" cy="237" r="237"/></clipPath></defs>${background}<g clip-path="url(#avatarClip)">${tshirt}${skin}${hair}${expression}</g></svg>`;
}

/**
 * Universal base64 encoding that works in browser and Node.js.
 * @internal
 */
function toBase64(str: string): string {
  // Works in browser and modern Node.js (v16+)
  if (typeof btoa === 'function') {
    return btoa(unescape(encodeURIComponent(str)));
  }
  // Fallback for older Node.js
  return Buffer.from(str, 'utf-8').toString('base64');
}

/**
 * Generates a base64-encoded SVG data URL for an avatar.
 * Works in both browser and Node.js environments.
 * Useful for setting as `src` on img elements or for embedding.
 *
 * @param config - Partial avatar configuration (missing values use defaults)
 * @param size - Width and height of the SVG in pixels (default: 474)
 * @returns Base64 data URL string (e.g., `data:image/svg+xml;base64,...`)
 *
 * @example
 * ```ts
 * import { generateBase64 } from 'chipmunk-avatars';
 *
 * const dataUrl = generateBase64({ expression: 'happy' });
 * const img = document.createElement('img');
 * img.src = dataUrl;
 * ```
 */
export function generateBase64(config: Partial<AvatarConfig> = {}, size: number = 474): string {
  const svg = generateSvg(config, size);
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

/**
 * Generates a PNG image as a base64 data URL from an avatar configuration.
 * **Browser only** - uses Canvas API for rendering.
 *
 * @param config - Partial avatar configuration (missing values use defaults)
 * @param size - Width and height of the PNG in pixels (default: 474)
 * @returns Promise resolving to a PNG data URL string
 * @throws Error if called in a non-browser environment
 *
 * @example
 * ```ts
 * import { generatePngBase64 } from 'chipmunk-avatars';
 *
 * const pngDataUrl = await generatePngBase64({ hair: 'spaceBuns' }, 256);
 * const img = document.createElement('img');
 * img.src = pngDataUrl;
 * ```
 */
export async function generatePngBase64(
  config: Partial<AvatarConfig> = {},
  size: number = 474
): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('generatePngBase64 is only available in browser environment');
  }

  const svg = generateSvg(config, size);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  });
}

/**
 * Downloads the avatar as an SVG file.
 * **Browser only** - triggers a file download in the browser.
 *
 * @param config - Partial avatar configuration (missing values use defaults)
 * @param filename - Name for the downloaded file (default: 'avatar.svg')
 * @throws Error if called in a non-browser environment
 *
 * @example
 * ```ts
 * import { downloadSvg } from 'chipmunk-avatars';
 *
 * // Download with default filename
 * downloadSvg({ background: 'mintGreen' });
 *
 * // Download with custom filename
 * downloadSvg({ background: 'mintGreen' }, 'my-avatar.svg');
 * ```
 */
export function downloadSvg(config: Partial<AvatarConfig> = {}, filename: string = 'avatar.svg'): void {
  if (typeof window === 'undefined') {
    throw new Error('downloadSvg is only available in browser environment');
  }

  const svg = generateSvg(config);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads the avatar as a PNG file.
 * **Browser only** - uses Canvas API and triggers a file download.
 *
 * @param config - Partial avatar configuration (missing values use defaults)
 * @param size - Width and height of the PNG in pixels (default: 474)
 * @param filename - Name for the downloaded file (default: 'avatar.png')
 * @throws Error if called in a non-browser environment
 *
 * @example
 * ```ts
 * import { downloadPng } from 'chipmunk-avatars';
 *
 * // Download with defaults
 * await downloadPng({ expression: 'happy' });
 *
 * // Download with custom size and filename
 * await downloadPng({ expression: 'happy' }, 512, 'my-avatar.png');
 * ```
 */
export async function downloadPng(
  config: Partial<AvatarConfig> = {},
  size: number = 474,
  filename: string = 'avatar.png'
): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('downloadPng is only available in browser environment');
  }

  const dataUrl = await generatePngBase64(config, size);

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
