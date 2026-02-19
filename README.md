# ImgConvertCrop

Lightweight web application for:
- Uploading an image
- Converting formats (`jpg/jpeg`, `png`, `webp`, `avif`)
- Cropping with an interactive crop box (drag/resize handles)
- Optional resize when confirming crop
- Compressing while keeping the same pixel dimensions
- Downloading the processed image

## Tech Stack
- Node.js + Express
- Plain HTML/CSS/JS frontend with in-browser Canvas processing (no heavy framework)

## Requirements
- Node.js 12+ (Node 18+ recommended in production)

## Run Locally

```bash
npm install
npm start
```

Open: `http://localhost:3444`

If port `3444` is busy:

```bash
PORT=3555 npm start
```

## Usage
1. Open the tool tab you want: `Convert`, `Crop`, or `Compress`.
2. Upload an image in that tab.
3. Configure options and click the tab action button to download the result.

## API
- `GET /health` -> `{ "ok": true }`

## SEO Tool Routes
- Core tool pages: `/convert`, `/crop`, `/compress`
- Convert intent pages: `/convert/png-to-jpg`, `/convert/jpg-to-webp`, `/convert/jpg-to-avif`
- Crop intent pages: `/crop/resize-image`, `/crop/crop-to-square`, `/crop/crop-to-16-9`
- Compress intent pages: `/compress/jpeg`, `/compress/webp`, `/compress/avif`

## Multilingual Routing
- Supported languages: `en`, `es`, `zh`, `hi`, `ar`
- Localized URLs use locale prefix, for example:
  - `/en/convert`
  - `/es/convert`
  - `/zh/crop`
- Requests to unprefixed pages (like `/`, `/convert`) are automatically redirected to a locale based on:
  1. `lang` cookie (if present)
  2. Browser `Accept-Language` header
- Users can switch language from the selector in the page header.

## Preflight Verification

```bash
npm install
PORT=3444 npm start
```

Then in another terminal:

```bash
curl http://127.0.0.1:3444/health
```

Expected:

```json
{"ok":true}
```

## Notes
- Conversion happens in-browser; files are not uploaded to the server.
- AVIF/WEBP export support depends on browser capabilities.
