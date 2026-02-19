const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3444;
const publicDir = path.join(__dirname, 'public');
const templatePath = path.join(publicDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const defaultSeo = {
  title: 'ImgConvertCrop.com | Convert, Crop, Compress Images Free',
  description:
    'ImgConvertCrop is a fast, free online image tool to convert formats, crop images, and compress files directly in your browser. We never save your images.',
  canonicalPath: '/',
  ogTitle: 'ImgConvertCrop.com | Convert, Crop, Compress Images Free',
  ogDescription:
    'Convert image formats, crop precisely, and compress online for free. Fast in-browser processing, and we never save your images.',
  twitterTitle: 'ImgConvertCrop.com | Convert, Crop, Compress Images Free',
  twitterDescription:
    'Free online image converter, cropper, and compressor. Runs in browser with privacy-first processing.',
  heroTitle: 'ImgConvertCrop',
  heroSubtitle:
    'Fast, free image tools in one place: convert formats, crop precisely, and compress in seconds. We never save your images.',
  seoH2: 'Free Online Image Converter, Cropper, and Compressor',
  seoP1: 'ImgConvertCrop helps you convert image formats, crop with precision, and reduce file size in seconds.',
  seoP2: 'Everything runs in your browser for speed and privacy. We never save your images.',
  seoLi1: 'Convert to JPEG, PNG, WEBP, and AVIF',
  seoLi2: 'Modern interactive crop with optional resize',
  seoLi3: 'Compress image files while keeping dimensions',
  keywordTitle: 'Popular Search Terms in the United States',
  keywordText:
    'Common queries include "image converter online free", "crop image online no watermark", and "compress image online free".',
  activeTab: 'convert'
};

const supportedLocales = ['en', 'es', 'zh', 'hi', 'ar'];
const localeMeta = {
  en: { name: 'English', htmlLang: 'en', dir: 'ltr' },
  es: { name: 'Espanol', htmlLang: 'es', dir: 'ltr' },
  zh: { name: '中文', htmlLang: 'zh-CN', dir: 'ltr' },
  hi: { name: 'Hindi', htmlLang: 'hi', dir: 'ltr' },
  ar: { name: 'العربية', htmlLang: 'ar', dir: 'rtl' }
};

const toolInternalLinks = {
  convert: [
    { href: '/convert', label: 'Image Converter Online' },
    { href: '/convert/png-to-jpg', label: 'PNG to JPG Converter' },
    { href: '/convert/jpg-to-webp', label: 'JPG to WEBP Converter' },
    { href: '/convert/jpg-to-avif', label: 'JPG to AVIF Converter' }
  ],
  crop: [
    { href: '/crop', label: 'Image Cropper Online' },
    { href: '/crop/resize-image', label: 'Crop and Resize Image' },
    { href: '/crop/crop-to-square', label: 'Crop Image to Square' },
    { href: '/crop/crop-to-16-9', label: 'Crop Image to 16:9' }
  ],
  compress: [
    { href: '/compress', label: 'Image Compressor Online' },
    { href: '/compress/jpeg', label: 'JPEG Compressor' },
    { href: '/compress/webp', label: 'WEBP Compressor' },
    { href: '/compress/avif', label: 'AVIF Compressor' }
  ]
};

const toolKeywordCopy = {
  convert:
    'US-focused intent terms: "image converter online free", "png to jpg online free", "jpg to webp converter", "jpg to avif online".',
  crop:
    'US-focused intent terms: "crop image online free", "crop image no watermark", "crop to square", "crop image to 16:9".',
  compress:
    'US-focused intent terms: "compress image online free", "jpeg compressor online", "compress webp", "compress avif image".'
};

const pages = {
  '/': {},
  '/convert': {
    title: 'Free Image Converter Online | JPG PNG WEBP AVIF',
    description: 'Convert images online for free. Change JPG, PNG, WEBP, and AVIF formats in your browser with no upload to server.',
    canonicalPath: '/convert',
    ogTitle: 'Free Image Converter Online | ImgConvertCrop',
    twitterTitle: 'Free Image Converter Online | ImgConvertCrop',
    heroTitle: 'Free Image Converter',
    heroSubtitle: 'Convert JPG, PNG, WEBP, and AVIF in seconds. Privacy-first, browser-based processing.',
    seoH2: 'Convert Images Between Popular Formats',
    seoP1: 'Use this tool to convert image files without installing software.',
    seoP2: 'Choose output format and quality, then download instantly.',
    seoLi1: 'JPG to WEBP converter',
    seoLi2: 'PNG to JPG converter',
    seoLi3: 'JPG to AVIF converter',
    activeTab: 'convert'
  },
  '/convert/png-to-jpg': {
    title: 'PNG to JPG Converter Online Free',
    description: 'Convert PNG to JPG online for free. Fast browser-based PNG to JPEG conversion with adjustable quality.',
    canonicalPath: '/convert/png-to-jpg',
    heroTitle: 'PNG to JPG Converter',
    heroSubtitle: 'Convert PNG images to JPG format quickly with size-friendly output.',
    seoH2: 'Convert PNG to JPG in Browser',
    seoP1: 'Great for reducing PNG file size when transparency is not needed.',
    seoP2: 'Your image stays local in your browser for better privacy.',
    seoLi1: 'No signup required',
    seoLi2: 'Set JPG quality before export',
    seoLi3: 'Works on desktop and mobile',
    activeTab: 'convert',
    convertFormat: 'jpeg',
    convertQuality: 90
  },
  '/convert/jpg-to-webp': {
    title: 'JPG to WEBP Converter Online Free',
    description: 'Convert JPG to WEBP online for smaller image files and better web performance. No server upload required.',
    canonicalPath: '/convert/jpg-to-webp',
    heroTitle: 'JPG to WEBP Converter',
    heroSubtitle: 'Turn JPEG images into WEBP to cut file size for websites and apps.',
    seoH2: 'Convert JPG to WEBP for Better Compression',
    seoP1: 'WEBP usually provides smaller files than JPG at similar visual quality.',
    seoP2: 'Choose quality level and download your WEBP image instantly.',
    seoLi1: 'Fast in-browser processing',
    seoLi2: 'No image upload to server',
    seoLi3: 'Quality control supported',
    activeTab: 'convert',
    convertFormat: 'webp',
    convertQuality: 85
  },
  '/convert/jpg-to-avif': {
    title: 'JPG to AVIF Converter Online Free',
    description: 'Convert JPG to AVIF online in your browser. Create modern, high-efficiency AVIF images for web delivery.',
    canonicalPath: '/convert/jpg-to-avif',
    heroTitle: 'JPG to AVIF Converter',
    heroSubtitle: 'Convert JPEG files to AVIF for high compression and modern browser support.',
    seoH2: 'Convert JPG to AVIF with Quality Control',
    seoP1: 'AVIF can significantly reduce image file size compared with legacy formats.',
    seoP2: 'If your browser supports AVIF encoding, conversion completes locally and quickly.',
    seoLi1: 'Modern AVIF output',
    seoLi2: 'No account needed',
    seoLi3: 'Runs directly in browser',
    activeTab: 'convert',
    convertFormat: 'avif',
    convertQuality: 80
  },
  '/crop': {
    title: 'Crop Image Online Free | Precise Image Cropper',
    description: 'Crop images online for free with an interactive crop box. Optionally resize after crop and export as JPG, PNG, WEBP, or AVIF.',
    canonicalPath: '/crop',
    ogTitle: 'Crop Image Online Free | ImgConvertCrop',
    twitterTitle: 'Crop Image Online Free | ImgConvertCrop',
    heroTitle: 'Free Image Cropper',
    heroSubtitle: 'Drag, resize, and export exact crop areas with optional resize after crop.',
    seoH2: 'Crop Images with an Interactive Frame',
    seoP1: 'Use drag-and-resize handles to choose the exact area to keep.',
    seoP2: 'Export cropped images in popular formats in one click.',
    seoLi1: 'Precision crop selection',
    seoLi2: 'Optional post-crop resize',
    seoLi3: 'Multiple output formats',
    activeTab: 'crop'
  },
  '/crop/resize-image': {
    title: 'Resize Image After Crop Online Free',
    description: 'Crop and resize images online for free. Set a crop area, then scale down to target width and height while keeping aspect ratio.',
    canonicalPath: '/crop/resize-image',
    heroTitle: 'Crop and Resize Image',
    heroSubtitle: 'Select crop area first, then resize output dimensions for web, social, or upload limits.',
    seoH2: 'Resize Image from Cropped Area',
    seoP1: 'Enable the resize option to scale the cropped image to your target size.',
    seoP2: 'Aspect ratio is preserved and images are never stretched.',
    seoLi1: 'Width and height targets',
    seoLi2: 'Aspect-ratio aware scaling',
    seoLi3: 'All processing stays local',
    activeTab: 'crop',
    enableCropResize: true
  },
  '/crop/crop-to-square': {
    title: 'Crop Image to Square Online Free',
    description: 'Crop an image to a square aspect ratio online for free. Perfect for profile pictures, avatars, and thumbnails.',
    canonicalPath: '/crop/crop-to-square',
    heroTitle: 'Crop Image to Square',
    heroSubtitle: 'Create 1:1 square crops for profile images, product cards, and social posts.',
    seoH2: 'Square Image Cropper (1:1)',
    seoP1: 'Quickly crop photos into a clean square frame with precise handle control.',
    seoP2: 'Download in JPG, PNG, WEBP, or AVIF.',
    seoLi1: '1:1 crop preset',
    seoLi2: 'Interactive crop frame',
    seoLi3: 'No watermark',
    activeTab: 'crop',
    cropPreset: 'square'
  },
  '/crop/crop-to-16-9': {
    title: 'Crop Image to 16:9 Online Free',
    description: 'Crop images to 16:9 aspect ratio online for free. Useful for video thumbnails, banners, and widescreen layouts.',
    canonicalPath: '/crop/crop-to-16-9',
    heroTitle: 'Crop Image to 16:9',
    heroSubtitle: 'Use a 16:9 crop area for YouTube thumbnails, hero banners, and widescreen content.',
    seoH2: '16:9 Aspect Ratio Image Crop',
    seoP1: 'Apply a widescreen crop ratio while keeping full control over image position.',
    seoP2: 'Export instantly with your preferred format and quality settings.',
    seoLi1: '16:9 preset for wide layouts',
    seoLi2: 'Drag to reposition framing',
    seoLi3: 'Fast browser-only workflow',
    activeTab: 'crop',
    cropPreset: '16:9'
  },
  '/compress': {
    title: 'Compress Image Online Free | JPG WEBP AVIF PNG',
    description: 'Compress images online for free while preserving pixel dimensions. Adjust quality and export optimized files quickly.',
    canonicalPath: '/compress',
    ogTitle: 'Compress Image Online Free | ImgConvertCrop',
    twitterTitle: 'Compress Image Online Free | ImgConvertCrop',
    heroTitle: 'Free Image Compressor',
    heroSubtitle: 'Reduce image file size for faster websites and easier sharing while keeping dimensions.',
    seoH2: 'Compress Images Without Changing Dimensions',
    seoP1: 'Lower encoded quality to shrink file size while keeping original width and height.',
    seoP2: 'Ideal for websites, email attachments, and upload limits.',
    seoLi1: 'Control compression quality',
    seoLi2: 'Keep original pixel dimensions',
    seoLi3: 'Export to JPG, WEBP, AVIF, or PNG',
    activeTab: 'compress'
  },
  '/compress/jpeg': {
    title: 'JPEG Compressor Online Free',
    description: 'Compress JPEG images online for free. Reduce JPG/JPEG file size with adjustable quality settings.',
    canonicalPath: '/compress/jpeg',
    heroTitle: 'JPEG Compressor',
    heroSubtitle: 'Shrink JPG/JPEG files quickly while balancing quality and size.',
    seoH2: 'Compress JPEG Files Online',
    seoP1: 'Use quality controls to optimize JPEG output for web and sharing.',
    seoP2: 'No upload required: image processing stays in your browser.',
    seoLi1: 'JPEG-focused compression',
    seoLi2: 'Adjustable quality',
    seoLi3: 'Instant download',
    activeTab: 'compress',
    compressFormat: 'jpeg',
    compressQuality: 70
  },
  '/compress/webp': {
    title: 'WEBP Compressor Online Free',
    description: 'Compress WEBP images online for free with quality control. Optimize web images for faster loading.',
    canonicalPath: '/compress/webp',
    heroTitle: 'WEBP Compressor',
    heroSubtitle: 'Optimize WEBP file size for performance-focused websites and apps.',
    seoH2: 'Compress WEBP Images in Browser',
    seoP1: 'Tune compression quality and keep the same image dimensions.',
    seoP2: 'Works directly in-browser for speed and privacy.',
    seoLi1: 'WEBP output optimization',
    seoLi2: 'Preserve dimensions',
    seoLi3: 'No account needed',
    activeTab: 'compress',
    compressFormat: 'webp',
    compressQuality: 65
  },
  '/compress/avif': {
    title: 'AVIF Compressor Online Free',
    description: 'Compress AVIF images online free. Adjust AVIF quality and generate smaller files for modern web delivery.',
    canonicalPath: '/compress/avif',
    heroTitle: 'AVIF Compressor',
    heroSubtitle: 'Create smaller AVIF files with flexible quality settings for modern image pipelines.',
    seoH2: 'Compress AVIF Images with Quality Control',
    seoP1: 'AVIF offers efficient compression for many image types and use cases.',
    seoP2: 'If AVIF encoding is available in your browser, output is generated locally.',
    seoLi1: 'Modern AVIF optimization',
    seoLi2: 'In-browser compression workflow',
    seoLi3: 'Quick export and download',
    activeTab: 'compress',
    compressFormat: 'avif',
    compressQuality: 60
  }
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((acc, item) => {
    const eq = item.indexOf('=');
    if (eq < 0) return acc;
    const key = item.slice(0, eq).trim();
    const value = item.slice(eq + 1).trim();
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

function normalizeLocale(code) {
  if (!code) return null;
  const lowered = String(code).toLowerCase().trim();
  const base = lowered.split('-')[0];
  return supportedLocales.includes(base) ? base : null;
}

function detectPreferredLocale(req) {
  const cookies = parseCookies(req.headers.cookie);
  const cookieLocale = normalizeLocale(cookies.lang);
  if (cookieLocale) return cookieLocale;

  const raw = req.headers['accept-language'] || '';
  const entries = raw
    .split(',')
    .map((token) => {
      const parts = token.trim().split(';');
      const code = normalizeLocale(parts[0]);
      if (!code) return null;
      const qPart = parts.find((p) => p.trim().startsWith('q='));
      const q = qPart ? Number(qPart.split('=')[1]) : 1;
      return { code, q: Number.isFinite(q) ? q : 1 };
    })
    .filter(Boolean)
    .sort((a, b) => b.q - a.q);

  return (entries[0] && entries[0].code) || 'en';
}

function toLocalizedPath(locale, pathname) {
  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
}

function parseLocalizedPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const locale = normalizeLocale(segments[0]);
  if (!locale) {
    return { hasLocalePrefix: false, locale: null, basePath: pathname };
  }
  const rest = `/${segments.slice(1).join('/')}`;
  return {
    hasLocalePrefix: true,
    locale,
    basePath: rest === '/' ? '/' : rest.replace(/\/+$/, '') || '/'
  };
}

function buildRelatedLinksHtml(pathname, activeTab, locale) {
  const links = toolInternalLinks[activeTab] || [];
  const filtered = links.filter((item) => item.href !== pathname);
  return filtered
    .map((item) => `<li><a href="${toLocalizedPath(locale, item.href)}">${escapeHtml(item.label)}</a></li>`)
    .join('');
}

function buildAlternateLinks(pathname) {
  const links = supportedLocales
    .map((locale) => {
      const href = `https://imgconvertcrop.com${toLocalizedPath(locale, pathname)}`;
      const hreflang = locale === 'en' ? 'en-US' : locale;
      return `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
    })
    .join('');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="https://imgconvertcrop.com${toLocalizedPath('en', pathname)}" />`;
  return `${links}${xDefault}`;
}

function buildLocaleOptionsHtml(locale) {
  return supportedLocales
    .map((code) => {
      const selected = code === locale ? ' selected' : '';
      const label = escapeHtml(localeMeta[code].name);
      return `<option value="${code}"${selected}>${label}</option>`;
    })
    .join('');
}

function renderPage(pathname, locale) {
  const config = { ...defaultSeo, ...(pages[pathname] || {}) };
  const canonicalPath = toLocalizedPath(locale, config.canonicalPath);
  const canonical = `https://imgconvertcrop.com${canonicalPath}`;
  const keywordText = config.keywordText || toolKeywordCopy[config.activeTab] || defaultSeo.keywordText;
  const relatedLinksHtml = buildRelatedLinksHtml(pathname, config.activeTab, locale);
  const tabClasses = {
    convertBtn: config.activeTab === 'convert' ? 'active' : '',
    cropBtn: config.activeTab === 'crop' ? 'active' : '',
    compressBtn: config.activeTab === 'compress' ? 'active' : '',
    convertPanel: config.activeTab === 'convert' ? 'active' : '',
    cropPanel: config.activeTab === 'crop' ? 'active' : '',
    compressPanel: config.activeTab === 'compress' ? 'active' : ''
  };

  const pageConfigJson = JSON.stringify({
    locale,
    basePath: pathname,
    activeTab: config.activeTab,
    convertFormat: config.convertFormat,
    convertQuality: config.convertQuality,
    compressFormat: config.compressFormat,
    compressQuality: config.compressQuality,
    cropPreset: config.cropPreset,
    enableCropResize: config.enableCropResize
  });

  const replacements = {
    __HTML_LANG__: localeMeta[locale].htmlLang,
    __HTML_DIR__: localeMeta[locale].dir,
    __META_DESCRIPTION__: escapeHtml(config.description),
    __CANONICAL_URL__: canonical,
    __ALT_HREFLANG_LINKS__: buildAlternateLinks(config.canonicalPath),
    __OG_TITLE__: escapeHtml(config.ogTitle || config.title),
    __OG_DESCRIPTION__: escapeHtml(config.ogDescription || config.description),
    __TWITTER_TITLE__: escapeHtml(config.twitterTitle || config.title),
    __TWITTER_DESCRIPTION__: escapeHtml(config.twitterDescription || config.description),
    __PAGE_TITLE__: escapeHtml(config.title),
    __HERO_TITLE__: escapeHtml(config.heroTitle),
    __HERO_SUBTITLE__: escapeHtml(config.heroSubtitle),
    __SEO_H2__: escapeHtml(config.seoH2),
    __SEO_P1__: escapeHtml(config.seoP1),
    __SEO_P2__: escapeHtml(config.seoP2),
    __SEO_LI_1__: escapeHtml(config.seoLi1),
    __SEO_LI_2__: escapeHtml(config.seoLi2),
    __SEO_LI_3__: escapeHtml(config.seoLi3),
    __KEYWORD_TITLE__: escapeHtml(config.keywordTitle),
    __KEYWORD_TEXT__: escapeHtml(keywordText),
    __RELATED_LINKS_HTML__: relatedLinksHtml,
    __LANG_OPTIONS_HTML__: buildLocaleOptionsHtml(locale),
    __CONVERT_TAB_ACTIVE__: tabClasses.convertBtn,
    __CROP_TAB_ACTIVE__: tabClasses.cropBtn,
    __COMPRESS_TAB_ACTIVE__: tabClasses.compressBtn,
    __CONVERT_PANEL_ACTIVE__: tabClasses.convertPanel,
    __CROP_PANEL_ACTIVE__: tabClasses.cropPanel,
    __COMPRESS_PANEL_ACTIVE__: tabClasses.compressPanel,
    __PAGE_CONFIG_JSON__: pageConfigJson
  };

  return Object.keys(replacements).reduce((html, key) => {
    return html.split(key).join(replacements[key]);
  }, template);
}

app.use(express.static(publicDir, { index: false }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('*', (req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/') && req.path !== '/') {
    const normalized = req.path.replace(/\/+$/, '');
    const parsed = parseLocalizedPath(normalized);
    if (pages[normalized] || (parsed.hasLocalePrefix && pages[parsed.basePath])) {
      res.redirect(301, normalized);
      return;
    }
  }
  next();
});

app.get('*', (req, res, next) => {
  const { hasLocalePrefix, locale, basePath } = parseLocalizedPath(req.path);

  if (!hasLocalePrefix) {
    if (!pages[req.path]) {
      next();
      return;
    }
    const preferred = detectPreferredLocale(req);
    res.redirect(302, toLocalizedPath(preferred, req.path));
    return;
  }

  if (!pages[basePath]) {
    next();
    return;
  }

  res.setHeader('Set-Cookie', `lang=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`);
  res.type('html').send(renderPage(basePath, locale));
});

app.listen(port, () => {
  console.log(`Image converter running on http://localhost:${port}`);
});
