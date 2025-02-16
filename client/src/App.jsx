import api from './api/api';
import { useQuery } from '@tanstack/react-query';

function App() {
  const { isPending, error, data } = useQuery({ queryKey: ['randomJoke'], queryFn: api.getRandomJoke });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  return <pre style={{ width: '800px' }}>{JSON.stringify(data)}</pre>;
}

export default App;
