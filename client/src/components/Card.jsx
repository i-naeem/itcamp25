import api from '../api/api';
import { Link } from 'react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function Card({ _id, question, answer, votes }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.voteJoke,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joke', _id] });
    },
  });

  const handleVote = (vote) => {
    mutation.mutate({ id: _id, content: { action: 'increment', value: vote.label } });
  };

  return (
    <article className='card'>
      <section className='card-body'>
        <h1>{question}</h1>
        <p>{answer}</p>
      </section>
      <section className='card-footer'>
        {votes.map((vote, idx) => (
          <button key={idx} className={`btn ${vote.active ? 'active' : ''}`} onClick={() => handleVote(vote)}>
            <span className='emoji'>{vote.label}</span>
            <span className='count'>{vote.value}</span>
          </button>
        ))}
        <div className='separator'></div>
        <Link to={`/edit/${_id}`} className='btn'>
          Delete
        </Link>
        <Link to={`/edit/${_id}`} className='btn'>
          Edit
        </Link>
        <Link to='/' className='next-button btn'>
          Next
        </Link>
      </section>
    </article>
  );
}
