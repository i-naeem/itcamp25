import api from '../api/api';
import EMOJIS_FOR_VOTES from './constants';
import { Link, useNavigate } from 'react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function Card({ _id, question, answer, votes }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const voteMutation = useMutation({
    mutationFn: api.voteJoke,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joke', _id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteJokeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jokes'] });
    },
  });

  const handleVote = (vote) => {
    voteMutation.mutate({ id: _id, content: { action: 'increment', value: vote.label } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this joke?')) {
      deleteMutation.mutate({ id: _id });
      navigate('/');
    }
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
            <span className='emoji'>{EMOJIS_FOR_VOTES[vote.label]}</span>
            <span className='count'>{vote.value}</span>
          </button>
        ))}
        <div className='separator'></div>
        <button onClick={handleDelete} className='btn delete-button'>
          Delete
        </button>
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
