import api from '../api/api';
import { Link } from 'react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function Card(props) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: api.voteJoke,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joke-by-id'] });
    },
  });

  return (
    <article className='card'>
      <section className='card-body'>
        <h1>{props.question}</h1>
        <p>{props.answer}</p>
      </section>
      <section className='card-footer'>
        {props.votes.map((vote, idx) => (
          <button
            key={idx}
            className={`btn ${vote.active ? 'active' : ''}`}
            onClick={() => {
              mutation.mutate({
                id: props._id,
                content: { action: 'increment', value: vote.label },
              });
            }}>
            <span className='emoji'>{vote.label}</span>
            <span className='count'>{vote.value}</span>
          </button>
        ))}
        <div className='separator'></div>
        <Link to='/' className='next-button btn'>
          Next
        </Link>
      </section>
    </article>
  );
}
