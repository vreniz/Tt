# SHATTERED RIFFS — Rock Band Landing Page

> Single-page promotional website for the rock band **Shattered Riffs** and their *Rock the Night Tour 2026*. Built with plain HTML, CSS, and a minimal amount of vanilla JavaScript. No frameworks, no build tools, no dependencies.

---

## Table of Contents

- [Overview](#overview)
- [Live Sections](#live-sections)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [CSS Techniques](#css-techniques)
- [JavaScript](#javascript)
- [Typography](#typography)
- [Colour Tokens](#colour-tokens)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Running Locally](#running-locally)
- [Author](#author)

---

## Overview

Shattered Riffs is a fully static, single-page site. The design system is driven by CSS custom properties declared once in `:root` and referenced throughout. Every interactive element — the mobile menu, the album flip cards, the gallery hover effects — is powered by CSS alone. JavaScript handles only two small behaviours that CSS cannot achieve on its own.

| Stat | Value |
|---|---|
| Core files | 3 (`index.html`, `styles.css`, `script.js`) |
| External dependencies | 0 |
| Build step required | No |
| JavaScript lines | ~20 |
| Responsive breakpoints | 2 |

---

## Live Sections

| Anchor | Section | Description |
|---|---|---|
| `#hero` | Hero | Two-column layout with headline, CTA buttons, and an animated "Now Playing" badge card |
| `#tour` | Tour Dates | Horizontally-scrollable table of four Latin American concert dates |
| `#about` | About | Flex row with band photo and biography highlights |
| `#music` | Discography | Four CSS-only 3D flip cards, one per album |
| `#gallery` | Gallery | Asymmetric CSS Grid with hover colour-reveal effect |
| `#video` | Video | Responsive YouTube embed for the "Dead Signal" music video |
| `#contact` | Contact | Email subscription form for merch drops and pre-sale access |
| `#sponsors` | Sponsors | Partner logo grid with greyscale-to-colour hover transition |

---

## Project Structure

```
shattered-riffs/
├── index.html                  — Single page, all sections
├── script.js                   — ~20 lines: badge animation + menu close
├── css/
│   └── styles.css              — All styles, ~1 200 lines, 15 sections
└── assets/
    ├── img/
    │   ├── hero-bg.jpg         — Hero background image
    │   ├── band.jpg            — About section band photo
    │   ├── concert-main.jpg    — Large gallery card
    │   ├── guitarist.jpg
    │   ├── crowd.jpg
    │   ├── stage.jpg
    │   ├── guitar-cover.jpg    — Flip card back: Collapse
    │   ├── album-frequency.jpg — Flip card back: Frequency
    │   ├── album-live.jpg      — Flip card back: Void Live
    │   └── album-static.jpg    — Flip card back: Static Black
    └── icons/
        ├── logo.ico            — Brand icon in the navbar
        ├── instagram.svg
        ├── facebook.svg
        ├── twitter.svg
        ├── youtube.svg
        ├── sponsor-avianca.png
        ├── sponsor-bancolombia.jpg
        └── sponsor-exito.png
```

---

## Key Features

### CSS-Only Burger Menu

The mobile navigation is controlled entirely by a hidden `<input type="checkbox">`. The `<label for="menu-toggle">` acts as the clickable hamburger icon. A CSS sibling selector shows and hides the dropdown with no JavaScript:

```css
.menu-toggle:checked ~ .nav-links {
  display: flex;
}
```

JavaScript only closes the menu after a nav link is tapped — a behaviour CSS alone cannot handle.

---

### 3D Flip Cards (Discography)

Each album card has a front face and a back face. `perspective` on the parent creates the 3D space. `backface-visibility: hidden` hides each face while it is rotated away from view.

```css
.zone-card        { perspective: 150rem; }
.zone-front,
.zone-back        { backface-visibility: hidden; transition: all 0.8s ease; }
.zone-back        { transform: rotateY(180deg); }

.zone-card:hover .zone-front { transform: rotateY(-180deg); }
.zone-card:hover .zone-back  { transform: rotateY(0); }
```

---

### Animated Badge Card

The "Now Playing" hero card starts hidden via CSS. JavaScript adds the `badge-visible` class after 600 ms to trigger the transition, then removes it at 3 600 ms:

```css
#badgeCard {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
#badgeCard.badge-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

### Asymmetric Gallery Grid

An editorial layout using CSS Grid span properties — no JavaScript masonry library required:

```css
.gallery-grid         { display: grid; grid-template-columns: repeat(3, 1fr); }
.gallery-card--large  { grid-row: span 2; }
.gallery-card--wide   { grid-column: span 2; }
```

---

### Responsive Video Embed

The YouTube iframe scales with its container at every viewport width using `aspect-ratio` instead of a fixed pixel height:

```css
.video-container iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
}
```

---

## CSS Techniques

| Technique | Purpose |
|---|---|
| CSS custom properties (`--red`, `--bg`, etc.) | Design tokens declared once in `:root`, used everywhere |
| `display: contents` on `.hero-content` | Wrapper becomes invisible to the grid; children participate directly |
| `clamp()` for fluid typography | Headings scale smoothly between viewport widths without extra media queries |
| `::before` pseudo-element on `.hero` | Background image and gradient stacked without extra HTML |
| `mix-blend-mode: lighten` on sponsor logos | Logos render correctly on the dark background without needing white-background variants |
| `filter` chain on social icons | SVG icons are coloured red on hover with no alternate icon files needed |
| `-webkit-overflow-scrolling: touch` on table | Momentum scrolling on iOS for the tour dates table |

---

## JavaScript

`script.js` contains exactly two functions:

```js
// 1 — Badge card: fade in at 600ms, fade out at 3 600ms
window.addEventListener('load', function () {
  const badge = document.getElementById('badgeCard');
  if (!badge) return;
  setTimeout(() => badge.classList.add('badge-visible'),    600);
  setTimeout(() => badge.classList.remove('badge-visible'), 3600);
});

// 2 — Close the CSS-only burger menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('menu-toggle').checked = false;
  });
});
```

---

## Typography

Both fonts are loaded from Google Fonts. `rel="preconnect"` tags in the `<head>` reduce DNS lookup latency.

| Variable | Family | Weights | Role |
|---|---|---|---|
| `--font-display` | Barlow Condensed | 400, 700, 900, 900i | All headings, brand, buttons, album cards |
| `--font-body` | DM Mono | 400, 500 | Body copy, eyebrow labels, nav links, tables |

---

## Colour Tokens

```css
:root {
  --bg:      #080808;               /* Page background — near black    */
  --surface: #111111;               /* Card and panel background        */
  --border:  rgba(232, 0, 61, .2);  /* Subtle red-tinted border         */
  --red:     #e8003d;               /* Brand accent                     */
  --orange:  #ff5500;               /* Secondary accent (reserved)      */
  --cyan:    #00c8a0;               /* Label highlights                 */
  --text:    #f0ede8;               /* Primary text — warm white        */
  --muted:   #6a6560;               /* Secondary and subdued text       */
}
```

---

## Responsive Breakpoints

### Tablet — `max-width: 1024px`

- Hero collapses to a single column; badge card is hidden
- Album grid drops from 4 columns to 2
- Gallery drops from 3 columns to 2
- About section stacks vertically
- Footer collapses to 2 columns

### Mobile — `max-width: 735px`

- Burger menu becomes active
- All grids collapse to a single column
- Tour dates table scrolls horizontally
- Subscription form stacks vertically
- Fluid heading sizes shrink via `clamp()`

---

## Running Locally

No installation or build step required. Open `index.html` directly in any browser.

For development with live reload:

```bash
# Python
python -m http.server 3000

# Node.js — no install needed
npx serve .
```

Then open `http://localhost:3000` in your browser.

> **Browser support:** All modern browsers (Chrome, Firefox, Safari, Edge). The CSS-only burger menu relies on the `:checked` sibling selector, which has full support across all current browsers.

---

## Author

**Vanessa F** — 2026
