# Pinterest Design Inspiration POC

A React proof of concept for exploring interior design inspiration through embedded Pinterest pins. Users can select a design, view its curated color palette, and discover recommended products associated with the selected inspiration.

## Features

- Embedded Pinterest pins displayed in a responsive gallery
- Design selection with a clear active state
- Curated color palettes for each supported pin
- Product recommendations for selected designs
- Responsive layout for desktop and mobile screens
- Privacy policy page available in `public/privacy-policy.html`

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS
- Pinterest Embed SDK
- npm

## Prerequisites

Install the following before running the project:

- Node.js 18 or later
- npm

## Installation

1. Clone or download the repository.
2. Open a terminal in the project directory.
3. Install the dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Vite typically uses `http://localhost:5173`.

## Production Build

Create a type-checked production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Project Structure

```text
src/
  assets/                  Static application assets
  components/
    PinterestGallery.tsx   Pinterest gallery and selection experience
  data/
    pinterestPalettes.ts   Color palettes mapped to Pinterest pins
    pinterestPins.ts       Pinterest pin URLs
    products.ts            Product recommendation data
  App.css                  Application styles
  App.tsx                  Root application component
  index.css                Global styles
  main.tsx                 Application entry point

public/
  privacy-policy.html      Privacy policy page
```

## Data and Integrations

Pinterest content is loaded through the Pinterest Embed SDK from `pinit.js`. The pin URLs, color palettes, and product recommendations are currently maintained as local data files under `src/data/`.

The Pinterest SDK requires an active internet connection for embedded content to render correctly. Changes to the embed markup or dynamically rendered pins may require the SDK to rebuild the embeds after the component updates.

## Future Improvements

- Add more Pinterest pins, palettes, and product recommendations
- Add search, filtering, and collections
- Move design and product data to an API or content management system
- Add automated tests for selection and palette rendering
- Improve accessibility and loading states for embedded content

## License

No license has been specified for this project.
