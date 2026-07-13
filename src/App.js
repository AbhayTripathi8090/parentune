import { useEffect, useState } from "react";
import { getBlog } from "./api";
import "./App.css";

const fallbackArticle = {
  pageTitle: "Blogs and Vlogs",
  breadcrumb: "Home>Blog>Blog Name",
  title: "Why you should take meningococcal meningitis seriously?",
  summary:
    "As we celebrate World Meningitis Day this month, let me take some time",
  ageGroup: "3-7 yrs",
  views: 225,
  authorName: "Zahira",
  authorRole: "MSc",
  reviewerName: "Janaradhan Reddy",
  reviewerRole: "Paediatrician MBBS",
  published: "13/04/24",
  updated: "14/04/25",
  paragraphs: [
    "As we celebrate World Meningitis Day this month, let me take some time and tell you a personal story and why you should take this name seriously.",
    "About five years ago, when I had just got married and not even planning for a child, an untimely death occurred in my husband's family. All that I remember now that it was due to meningitis and happened within 24 hours.",
  ],
  articleItems: [
    "What are the risk factors for meningococcal meningitis?",
    "How common is meningitis in children?",
    "Why is this infection dangerous?",
  ],
  
};

const placeholderImage =
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

function stripHtml(value) {
  if (!value) return "";

  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}




function extractParagraphs(value) {
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

function formatDate(value, fallback) {
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

function getInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "PT";
}

function Avatar({ src, name }) {
  if (src) {
    return <img className="avatarImage" src={src} alt={name} />;
  }

  return (
    <div className="avatarFallback" aria-hidden="true">
      {getInitials(name)}
    </div>
  );
}

export default function App() {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog();
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog data", error);
      }
    };

    fetchBlog();
  }, []);

  const heroImage =
    blog?.bannerImage ||
    blog?.image ||
    blog?.coverImage ||
    blog?.thumbnail ||
    blog?.thumb ||
    blog?.thumbNail ||
    blog?.meta_info?.metaImage ||
    placeholderImage;

  const descriptionParagraphs = extractParagraphs(blog?.description);

  const article = {
    ...fallbackArticle,
    title: blog?.title || blog?.blogTitle || fallbackArticle.title,
    summary:
      stripHtml(blog?.summary || blog?.description) || fallbackArticle.summary,
    ageGroup:
      blog?.primaryAgeGroup ||
      blog?.age_group_name ||
      blog?.ageGroup ||
      blog?.age_group_id ||
      fallbackArticle.ageGroup,
    views: blog?.viewsCount || blog?.views || blog?.viewCount || fallbackArticle.views,
    authorName: blog?.bloggerName || fallbackArticle.authorName,
    authorRole: blog?.bloggerRole || fallbackArticle.authorRole,
    reviewerName:
      blog?.reviewerName ||
      blog?.reviewedBy?.name ||
      fallbackArticle.reviewerName,
    reviewerRole:
      blog?.reviewerRole ||
      blog?.reviewedBy?.designation ||
      fallbackArticle.reviewerRole,
    published: formatDate(
      blog?.pDate || blog?.createdDate || blog?.publishDate || blog?.cdate,
      fallbackArticle.published
    ),
    updated: formatDate(
      blog?.mDate || blog?.updatedDate || blog?.modifiedDate || blog?.udate,
      fallbackArticle.updated
    ),
    paragraphs:
      descriptionParagraphs.length > 0
        ? descriptionParagraphs
        : fallbackArticle.paragraphs,
  };

  return (
    <main className="appShell">
      <section className="blogPage">
        <header className="pageHeader">
          <button className="backButton" type="button" aria-label="Go back">
            <span aria-hidden="true">&#8592;</span>
          </button>
          <h2 className="pageTitle">{fallbackArticle.pageTitle}</h2>
        </header>
        <p className="breadcrumb">{fallbackArticle.breadcrumb}</p>

        <h1 className="articleTitle">{article.title}</h1>

        <p className="summary">
          {article.summary?.split(" ").slice(0, 15).join(" ")}
        </p>

        <div className="metaRow">
          <span>Age Group: {article.ageGroup}</span>
          <span>{article.views} views</span>
        </div>

        <div className="authorRow">
          <article className="authorChip">
            <Avatar src={blog?.bloggerAvatar} name={article.authorName} />
            <div>
              <p className="chipLabel">Author: {article.authorName}</p>
              <p className="chipRole">{article.authorRole}</p>
            </div>
          </article>

          <article className="authorChip">
            <Avatar src={blog?.reviewerAvatar} name={article.reviewerName} />
            <div>
              <p className="chipLabel">Reviewed By: {article.reviewerName}</p>
              <p className="chipRole">{article.reviewerRole}</p>
            </div>
          </article>
        </div>

        <img className="heroImage" src={heroImage} alt={article.title} />

        <div className="dateRow">
          <span>Published: {article.published}</span>
          <span>Updated: {article.updated}</span>
        </div>

        <div className="premiumTag">
          <span className="premiumDot" aria-hidden="true" />
          <span>Only for PLUS members</span>
        </div>

        <section className="bodyCopy">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>        
      </section>
    </main>
  );
}
