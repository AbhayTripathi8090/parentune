export default function ReferencesSection({ references }) {
  return (
    <section className="referencesSection" aria-labelledby="references-title">
      <h2 id="references-title">References</h2>
      <p className="referencesIntro">
        Parentune's articles are written after analyzing the research works of
        expert authors and institutions. Our references consist of resources
        established by authorities in their respective fields. You can learn
        more about the authenticity of the information we present in our{" "}
        <a href="https://www.parentune.com/">editorial policy</a>.
      </p>
      <ol className="referencesList">
        {references.map((reference, index) => (
          <li key={`${reference.title}-${index}`}>
            <a href={reference.url}>{reference.title}</a>
            {reference.source && <span>; {reference.source}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
