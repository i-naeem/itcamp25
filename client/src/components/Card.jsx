export default function Card(props) {
  return (
    <article className='card'>
      <section className='card-body'>
        <h1>{props.question}</h1>
        <p>{props.answer}</p>
      </section>
      <section className='card-footer'>
        {props.votes.map((vote, idx) => (
          <button key={idx} className='btn'>
            <span class='emoji'>{vote.label}</span>
            <span class='count'>{vote.value}</span>
          </button>
        ))}
        <div className='separator'></div>
        <button className='next-button btn'>Next</button>
      </section>
    </article>
  );
}
