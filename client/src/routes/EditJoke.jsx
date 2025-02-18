import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import EditCard from '../components/EditCard';
import api from '../api/api';

export default function EditJoke(props) {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['joke', id],
    queryFn: () => api.getJokeById(id),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return <EditCard {...data} />;
}
