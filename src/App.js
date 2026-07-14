import { useEffect, useState } from "react";
import { getBlog } from "./api";
import ArticleBody from "./components/ArticleBody";
import ArticleHeader from "./components/ArticleHeader";
import ContributorSection from "./components/ContributorSection";
import ReferencesSection from "./components/ReferencesSection";
import { fallbackArticle } from "./data/fallbackArticle";
import { buildArticle, getHeroImage } from "./utils/article";
import "./App.css";

export default function App() {
  const [blog, setBlog] = useState(null);
  const [activeContributorTab, setActiveContributorTab] = useState("reviewer");

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

  const article = buildArticle(blog);
  const heroImage = getHeroImage(blog);

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

        <ArticleHeader article={article} />

        <img className="heroImage" src={heroImage} alt={article.title} />

        <div className="dateRow">
          <span>Published: {article.published}</span>
          <span>Updated: {article.updated}</span>
        </div>

        <div className="premiumTag">
          <span className="premiumDot" aria-hidden="true" />
          <span>Only for PLUS members</span>
        </div>

        <ArticleBody article={article} />
        <ReferencesSection references={article.references} />
        <ContributorSection
          contributors={article.contributors}
          activeTab={activeContributorTab}
          onTabChange={setActiveContributorTab}
        />
      </section>
    </main>
  );
}
