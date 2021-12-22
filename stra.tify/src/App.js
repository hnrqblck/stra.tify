import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Api from './api/Api';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import PodcastHome from './pages/PodcastHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          {/* <Route path="/" element={ <AboutUs />} /> */}
          <Route path="/login" element={ <Login />} />
          <Route path="/podcast-home" element={ <PodcastHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
