import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import api from '../api/api';

export default function EditCard({ _id, question: initialQuestion, answer: initialAnswer }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: api.updateJoke,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joke', _id] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: _id, content: { question, answer } });
    navigate('/' + _id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <article className='card'>
        <section className='card-body'>
          <input type='text' className='editable' value={question} onChange={(e) => setQuestion(e.target.value)} />
          <textarea className='editable' value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </section>
        <section className='card-footer' style={{ justifyContent: 'flex-end' }}>
          <Link to={`/${_id}`} className='cancel-button btn'>
            Cancel
          </Link>
          <button type='submit' className='btn save-button'>
            Save
          </button>
        </section>
      </article>
    </form>
  );
}
