import Header from './components/Header';
import EditJoke from './routes/EditJoke';
import Home from './routes/Home';
import Joke from './routes/Joke';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <section>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Joke />} />
            <Route path='/edit/:id' element={<EditJoke />} />
          </Routes>
        </section>
      </main>
      <footer>Lorem ipsum dolor &copy; 2025</footer>
    </div>
  );
}

export default App;
