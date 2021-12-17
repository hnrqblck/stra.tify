import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Api from './api/Api';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
