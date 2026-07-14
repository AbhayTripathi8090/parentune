import { getInitials } from "../utils/text";

export default function DoctorQuestions({ questions }) {
  const question = questions[0];

  if (!question) return null;

  return (
    <section className="doctorQaCard" aria-labelledby="doctor-qa-title">
      <h2 id="doctor-qa-title">Doctor Q&As from Parents like you</h2>
      <article className="doctorQaPanel">
        <div className="qaPerson">
          <div className="qaAvatar" aria-hidden="true">
            {getInitials(question.askerName)}
          </div>
          <div>
            <h3>{question.askerName}</h3>
            <p>{question.askerStage}</p>
          </div>
        </div>
        <p className="qaQuestion">{question.question}</p>
        <div className="answeredBy">Answered By</div>
        <div className="qaPerson doctorPerson">
          <div className="doctorAvatar" aria-hidden="true">
            {getInitials(question.doctorName)}
          </div>
          <div>
            <h3>
              {question.doctorName}
              <span aria-hidden="true"> &#10022;</span>
            </h3>
            <p>{question.doctorRole}</p>
          </div>
        </div>
        <p className="qaAnswer">{question.answer}</p>
      </article>
      <div className="qaDots" aria-hidden="true">
        <span />
      </div>
      <button className="askNowButton" type="button">
        ASK NOW
      </button>
    </section>
  );
}
