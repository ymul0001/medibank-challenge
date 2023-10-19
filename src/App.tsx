import { FC } from 'react';
import './App.css';
import { HomePage } from './pages/home-page/HomePage';

const App : FC = () => {
  return (
    <div className="app">
      <HomePage/>
    </div>
  );
}


export default App;