import Avatar from "./Avatar";

export default function ArticleHeader({ article }) {
  return (
    <>
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
          <Avatar src={article.authorAvatar} name={article.authorName} />
          <div>
            <p className="chipLabel">Author: {article.authorName}</p>
            <p className="chipRole">{article.authorRole}</p>
          </div>
        </article>

        <article className="authorChip">
          <Avatar src={article.reviewerAvatar} name={article.reviewerName} />
          <div>
            <p className="chipLabel">Reviewed By: {article.reviewerName}</p>
            <p className="chipRole">{article.reviewerRole}</p>
          </div>
        </article>
      </div>
    </>
  );
}
