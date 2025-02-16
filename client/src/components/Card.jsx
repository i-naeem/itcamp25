export default function Card(props) {
  return (
    <article>
      <section>
        <h1>{props.question}</h1>
        <p>{props.answer}</p>
      </section>
      <section>
        {props.votes.map((vote, idx) => (
          <p key={idx}>
            {vote.label}:{vote.value}
          </p>
        ))}
      </section>
    </article>
  );
}
