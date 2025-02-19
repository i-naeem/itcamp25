import Home from './routes/Home';
import Joke from './routes/Joke';
import Header from './components/Header';
import EditJoke from './routes/EditJoke';
import {  Route, Routes, Navigate } from 'react-router';

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <section>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Joke />} />
            <Route path='/edit/:id' element={<EditJoke />} />
            <Route path='*' element={<Navigate to="/" />} />
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
