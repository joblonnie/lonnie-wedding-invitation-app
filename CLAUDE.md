# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A responsive wedding invitation web app (Korean: 청첩장) supporting multiple themes and i18n (Korean/English/Chinese). All text and photos are templated for reusability.

## Commands

```bash
yarn dev          # Start dev server
yarn build        # Production build
yarn typecheck    # TypeScript check (no emit)
yarn preview      # Preview production build
```

## Tech Stack

- **React 19** + **TypeScript** with Vite
- **vanilla-extract** for styling (CSS-in-TypeScript, zero-runtime)
- **Yarn Berry** (v4) as package manager

## Architecture

### Source Structure (`src/`)

- `main.tsx` - Entry point, renders App
- `ui/` - All UI components and logic
  - `App.tsx` - Root component; manages language/theme state
  - `i18n.ts` - Translation system with `t(language)` for strings, `detectDefaultLanguage()` for locale detection
  - `invitation/types.ts` - Core `Invitation` type defining all templated content
  - `invitation/defaultInvitation.ts` - Sample invitation data
  - `theme/` - Theming via vanilla-extract theme contracts
    - `theme.css.ts` - Theme contract (`vars`) and theme classes (`classicThemeClass`, `midnightThemeClass`)
    - `theme.ts` - `themeClassFromName()` helper
  - `meta/setSocialMeta.ts` - Sets Open Graph/Twitter meta tags dynamically
  - `calendar/downloadIcs.ts` - ICS file generation for calendar events

### Key Patterns

- **i18n**: All user-facing strings use `{ ko, en, zh }` objects. Language auto-detected from browser locale.
- **Theming**: Themes applied as CSS class on `<html>`. Use `vars.color.*` from `theme.css.ts` for colors.
- **Theme override**: Add `?theme=classic` or `?theme=midnight` to URL.
- **Invitation templating**: Modify `defaultInvitation.ts` or create new invitation objects conforming to `Invitation` type.
