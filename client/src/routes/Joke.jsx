import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Card from '../components/Card';
import api from '../api/api';

export default function Joke(props) {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({ queryKey: ['joke-by-id'], queryFn: () => api.getJokeById(id)});

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return <Card {...data} />
}
