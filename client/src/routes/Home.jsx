import api from '../api/api';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Home(props) {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({ queryKey: ['randomJoke'], queryFn: api.getRandomJoke });

  useEffect(() => {
    if (data) {
      navigate('/' + data._id);
    }
  }, [data, navigate]);

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return null;
}
