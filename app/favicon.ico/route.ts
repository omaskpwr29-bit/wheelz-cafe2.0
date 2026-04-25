const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F5C518"/>
      <stop offset="1" stop-color="#191970"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#0D0D2B"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="url(#g)" stroke-width="6"/>
  <circle cx="32" cy="32" r="5" fill="#F5C518"/>
</svg>
`;

export function GET() {
  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

