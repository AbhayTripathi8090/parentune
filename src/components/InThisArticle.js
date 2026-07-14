export default function InThisArticle({ items }) {
  return (
    <section className="inArticleCard" aria-labelledby="in-article-title">
      <h2 id="in-article-title">In This Article</h2>
      <ul className="inArticleList">
        {items.map((item) => (
          <li key={item}>
            <span aria-hidden="true">&#8595;</span>
            <a href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
