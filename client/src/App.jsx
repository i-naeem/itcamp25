import api from './api/api';
import Card from './components/Card';
import { useQuery } from '@tanstack/react-query';

function App() {
  const { isPending, error, data } = useQuery({ queryKey: ['randomJoke'], queryFn: api.getRandomJoke });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <main>
      <h1>Random Joke</h1>
      <Card {...data} />
    </main>
  );
}

export default App;
