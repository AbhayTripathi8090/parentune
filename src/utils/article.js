import { fallbackArticle } from "../data/fallbackArticle";
import { placeholderImage } from "../data/placeholderImage";
import { extractParagraphs, formatDate, stripHtml } from "./text";

function normalizeList(value, fallback) {
  if (!Array.isArray(value) || value.length === 0) return fallback;

  return value
    .map((item) =>
      typeof item === "string" ? item : item?.title || item?.text || item?.question
    )
    .filter(Boolean);
}

function normalizeFaqs(value, fallback) {
  if (!Array.isArray(value) || value.length === 0) return fallback;

  const faqs = value
    .map((item) => ({
      question: item?.question || item?.title || item?.faqQuestion,
      answer: stripHtml(item?.answer || item?.description || item?.faqAnswer),
    }))
    .filter((item) => item.question && item.answer);

  return faqs.length > 0 ? faqs : fallback;
}

function normalizeReferences(value, fallback) {
  if (!Array.isArray(value) || value.length === 0) return fallback;

  const references = value
    .map((item) => ({
      title: item?.title || item?.name || item?.text,
      source: item?.source || item?.publisher || item?.site || "",
      url: item?.url || item?.link || "https://www.parentune.com/",
    }))
    .filter((item) => item.title);

  return references.length > 0 ? references : fallback;
}

function normalizeContributors(value, fallback) {
  if (!value || typeof value !== "object") return fallback;

  return {
    ...fallback,
    ...Object.fromEntries(
      Object.entries(value).map(([key, contributor]) => [
        key,
        {
          ...fallback[key],
          ...contributor,
        },
      ])
    ),
  };
}

function syncArticleContributors(contributors, article) {
  return {
    ...contributors,
    reviewer: {
      ...contributors.reviewer,
      name: article.reviewerName,
      role: article.reviewerRole,
      image: article.reviewerAvatar,
    },
    author: {
      ...contributors.author,
      name: article.authorName,
      role: article.authorRole,
      image: article.authorAvatar,
    },
  };
}

export function getHeroImage(blog) {
  return (
    blog?.bannerImage ||
    blog?.image ||
    blog?.coverImage ||
    blog?.thumbnail ||
    blog?.thumb ||
    blog?.thumbNail ||
    blog?.meta_info?.metaImage ||
    placeholderImage
  );
}

export function buildArticle(blog) {
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
    authorAvatar: blog?.bloggerAvatar || blog?.authorAvatar || "",
    reviewerName:
      blog?.reviewerName ||
      blog?.reviewedBy?.name ||
      fallbackArticle.reviewerName,
    reviewerRole:
      blog?.reviewerRole ||
      blog?.reviewedBy?.designation ||
      fallbackArticle.reviewerRole,
    reviewerAvatar: blog?.reviewerAvatar || blog?.reviewedBy?.avatar || "",
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
    articleItems: normalizeList(
      blog?.articleItems || blog?.tableOfContents || blog?.inThisArticle,
      fallbackArticle.articleItems
    ),
    doctorQuestions:
      Array.isArray(blog?.doctorQuestions) && blog.doctorQuestions.length > 0
        ? blog.doctorQuestions
        : fallbackArticle.doctorQuestions,
    faqs: normalizeFaqs(
      blog?.faqs || blog?.faq || blog?.frequentlyAskedQuestions,
      fallbackArticle.faqs
    ),
    references: normalizeReferences(
      blog?.references || blog?.referenceLinks || blog?.sources,
      fallbackArticle.references
    ),
    contributors: normalizeContributors(
      blog?.contributors || blog?.profiles,
      fallbackArticle.contributors
    ),
  };

  return {
    ...article,
    contributors: syncArticleContributors(article.contributors, article),
  };
}
