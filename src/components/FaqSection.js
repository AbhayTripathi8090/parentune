export default function FaqSection({ faqs }) {
  return (
    <section className="faqSection" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <details className="faqItem" key={`${faq.question}-${index}`} open={index === 1}>
          <summary>
            <span>{faq.question}</span>
            <span className="faqIcon" aria-hidden="true" />
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </section>
  );
}
