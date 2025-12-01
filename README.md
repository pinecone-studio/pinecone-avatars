# pinecone-avatars

A customizable React avatar picker library with 60+ unique combinations. Generate fun, SVG-based avatars with different backgrounds, skin tones, hairstyles, expressions, and outfits.

![npm](https://img.shields.io/npm/v/pinecone-avatars)
![license](https://img.shields.io/npm/l/pinecone-avatars)
![bundle size](https://img.shields.io/bundlephobia/minzip/pinecone-avatars)

**[Live Demo](https://temuulennibno.github.io/pinecone-avatars/)**

## Features

- 8 background colors
- 5 skin tones
- 27 hairstyles
- 14 expressions
- 9 t-shirt colors
- Fully typed with TypeScript
- Export to SVG, Base64, or PNG
- Zero dependencies (only React peer dep)
- Works with Next.js, Vite, Create React App

## Framework Compatibility

| Framework | Support |
|-----------|---------|
| Next.js (App Router) | Full support |
| Next.js (Pages Router) | Full support |
| Vite + React | Full support |
| Create React App | Full support |
| Remix | Full support |

> **Note:** `generatePngBase64()`, `downloadSvg()`, and `downloadPng()` require browser environment. In Next.js, call these only on the client side.

## Installation

```bash
npm install pinecone-avatars
```

```bash
yarn add pinecone-avatars
```

```bash
pnpm add pinecone-avatars
```

```bash
bun add pinecone-avatars
```

## Quick Start

```tsx
import { Avatar } from 'pinecone-avatars';

function App() {
  return <Avatar size={200} />;
}
```

## Usage

### Basic Avatar

```tsx
import { Avatar } from 'pinecone-avatars';

<Avatar size={200} />
```

### Custom Avatar

```tsx
import { Avatar } from 'pinecone-avatars';

<Avatar
  size={200}
  background="babyBlue"
  skin="softPeach"
  tshirt="orange"
  expression="happy"
  hair="shortBuzz"
/>
```

### Random Avatar

```tsx
import { Avatar, generateRandomConfig } from 'pinecone-avatars';

<Avatar {...generateRandomConfig()} size={200} />
```

### Avatar Picker Component

Interactive UI for selecting avatar options:

```tsx
import { AvatarPicker } from 'pinecone-avatars';

function App() {
  const handleChange = (config) => {
    console.log('Avatar config:', config);
  };

  return <AvatarPicker onChange={handleChange} />;
}
```

### Export Avatar

```tsx
import {
  generateSvg,
  generateBase64,
  generatePngBase64,
  downloadSvg,
  downloadPng
} from 'pinecone-avatars';

const config = {
  background: 'babyBlue',
  skin: 'softPeach',
  tshirt: 'orange',
  expression: 'happy',
  hair: 'shortBuzz'
};

// Get full SVG string
const svgString = generateSvg(config);

// Get base64 SVG data URL
const base64Svg = generateBase64(config);

// Use in img tag
<img src={generateBase64(config)} alt="avatar" />

// Get base64 PNG (browser only)
const base64Png = await generatePngBase64(config, 512);

// Download as SVG file (browser only)
downloadSvg(config, 'my-avatar.svg');

// Download as PNG file (browser only)
await downloadPng(config, 512, 'my-avatar.png');
```

## Next.js Example

```tsx
// app/page.tsx (App Router)
import { Avatar, generateRandomConfig } from 'pinecone-avatars';

export default function Page() {
  return <Avatar {...generateRandomConfig()} size={200} />;
}
```

```tsx
// app/picker/page.tsx (App Router - AvatarPicker works directly, has "use client" built-in)
import { AvatarPicker } from 'pinecone-avatars';

export default function PickerPage() {
  return <AvatarPicker onChange={(config) => console.log(config)} />;
}
```

```tsx
// Client-side export (App Router)
"use client";

import { downloadPng } from 'pinecone-avatars';

export function DownloadButton({ config }) {
  return (
    <button onClick={() => downloadPng(config, 512, 'avatar.png')}>
      Download PNG
    </button>
  );
}
```

## API Reference

### `<Avatar />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `200` | Avatar size in pixels |
| `background` | `BackgroundType` | `'babyBlue'` | Background color |
| `skin` | `SkinType` | `'softPeach'` | Skin tone |
| `tshirt` | `TshirtType` | `'orange'` | T-shirt color |
| `expression` | `ExpressionType` | `'happy'` | Facial expression |
| `hair` | `HairType` | `'shortBuzz'` | Hairstyle |
| `className` | `string` | - | CSS class name |
| `style` | `CSSProperties` | - | Inline styles |

### `<AvatarPicker />`

| Prop | Type | Description |
|------|------|-------------|
| `value` | `AvatarConfig` | Controlled value |
| `onChange` | `(config: AvatarConfig) => void` | Change callback |
| `className` | `string` | CSS class name |

### Functions

| Function | Description |
|----------|-------------|
| `generateRandomConfig()` | Returns a random `AvatarConfig` |
| `generateSvg(config?, size?)` | Returns SVG string |
| `generateBase64(config?, size?)` | Returns base64 SVG data URL |
| `generatePngBase64(config?, size?)` | Returns base64 PNG data URL (async, browser only) |
| `downloadSvg(config?, filename?)` | Downloads SVG file (browser only) |
| `downloadPng(config?, size?, filename?)` | Downloads PNG file (async, browser only) |

## Available Options

### Background (`BackgroundType`)

`babyBlue` | `coralRed` | `darkGray` | `lightGray` | `mintGreen` | `pastelGreen` | `peach` | `softPink`

### Skin (`SkinType`)

`deepBrown` | `warmBrown` | `mediumTan` | `softPeach` | `lightCream`

### T-Shirt (`TshirtType`)

`amber` | `blue` | `charcoal` | `green` | `orange` | `pink` | `raspberry` | `white` | `yellow`

### Expression (`ExpressionType`)

`angry` | `blissful` | `content` | `dizzy` | `excited` | `furious` | `happy` | `playful` | `sad` | `sideGlance` | `skeptical` | `sleepy` | `suspicious` | `wink`

### Hair (`HairType`)

`afroPuffs` | `asymmetricBuns` | `bob` | `bobSidePart` | `bowlCut` | `braids` | `bunnyEars` | `curlyHeadband` | `curlyMessy` | `curlyPigtails` | `curlyPuff` | `fullCurly` | `longAfro` | `longPeak` | `longStraight` | `messyArtistic` | `pigtailBuns` | `shortBuns` | `shortBuzz` | `shortCurly` | `sideBangs` | `spaceBuns` | `spikyEarmuffs` | `tinyBun` | `topKnot` | `wavyCenterPart` | `wavyPuffs`

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  AvatarConfig,
  AvatarProps,
  AvatarPickerProps,
  BackgroundType,
  SkinType,
  TshirtType,
  ExpressionType,
  HairType
} from 'pinecone-avatars';
```

## Constants

Access all available options as arrays:

```tsx
import {
  BACKGROUNDS,
  SKINS,
  TSHIRTS,
  EXPRESSIONS,
  HAIRS
} from 'pinecone-avatars';

console.log(BACKGROUNDS); // ['babyBlue', 'coralRed', ...]
console.log(HAIRS);       // ['afroPuffs', 'asymmetricBuns', ...]
```

## License

MIT
