export function stripHtml(value) {
  if (!value) return "";

  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractParagraphs(value) {
  if (!value) return [];

  const matches = String(value).match(/<p\b[^>]*>(.*?)<\/p>/gis);

  if (!matches) {
    const plainText = stripHtml(value);
    return plainText ? [plainText] : [];
  }

  return matches
    .map((paragraph) => stripHtml(paragraph))
    .filter(Boolean)
    .filter((paragraph) => paragraph !== "&");
}

export function formatDate(value, fallback) {
  if (!value) return fallback;

  if (/^\d{2}\/\d{2}\/\d{2,4}$/.test(String(value))) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
}

export function getInitials(name) {
  return (
    (name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "PT"
  );
}
