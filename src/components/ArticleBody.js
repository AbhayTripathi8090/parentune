import DoctorQuestions from "./DoctorQuestions";
import FaqSection from "./FaqSection";
import InThisArticle from "./InThisArticle";

function ParagraphBlock({ paragraphs }) {
  if (paragraphs.length === 0) return null;

  return (
    <section className="bodyCopy">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

export default function ArticleBody({ article }) {
  const introParagraphs = article.paragraphs.slice(0, 2);
  const remainingParagraphs = article.paragraphs.slice(2);

  return (
    <>
      <ParagraphBlock paragraphs={introParagraphs} />
      <InThisArticle items={article.articleItems} />
      <ParagraphBlock paragraphs={remainingParagraphs} />
      <DoctorQuestions questions={article.doctorQuestions} />
      <FaqSection faqs={article.faqs} />
    </>
  );
}
