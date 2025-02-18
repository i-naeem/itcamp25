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
      <footer className='site-footer'>
        <div className='container'>
          <p>
            Special thanks to{' '}
            <a href='https://www.dataart.com/' target='_blank' rel='noopener noreferrer'>
              DataArt IT
            </a>{' '}
            for hosting the workshop and guiding me.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
