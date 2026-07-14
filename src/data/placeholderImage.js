export const placeholderImage =
  "data:image/svg+xml," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f2eadf"/>
          <stop offset="100%" stop-color="#f8f4ee"/>
        </linearGradient>
      </defs>
      <rect width="720" height="480" fill="url(#bg)"/>
      <rect x="0" y="340" width="720" height="140" fill="#eee5d8"/>
      <circle cx="360" cy="160" r="78" fill="#d0a07a"/>
      <rect x="304" y="220" width="112" height="126" rx="30" fill="#6bb4dd"/>
      <rect x="290" y="222" width="24" height="114" rx="12" fill="#d0a07a"/>
      <rect x="406" y="222" width="24" height="114" rx="12" fill="#d0a07a"/>
      <rect x="323" y="340" width="28" height="110" rx="14" fill="#d0a07a"/>
      <rect x="369" y="340" width="28" height="110" rx="14" fill="#d0a07a"/>
      <rect x="298" y="430" width="70" height="18" rx="9" fill="#b98764"/>
      <rect x="352" y="430" width="70" height="18" rx="9" fill="#b98764"/>
      <text x="360" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#7b6b5d">
        Blog Visual
      </text>
    </svg>
  `);
