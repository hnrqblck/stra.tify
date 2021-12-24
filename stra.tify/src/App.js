import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./components/providers/auth";
import Home from './pages/Home';
import Login from './pages/Login';
import PodcastHome from './pages/PodcastHome';
import PodcastEps from './pages/PodcastEps';
import Podcasts from './pages/Podcasts';

function App() {
  const auth = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/podcast-home" element={ <PodcastHome />}>
            {/* {!auth.isAuthenticated ? <Navigate to="/login" /> : <PodcastHome/>} */}
          </Route>
          <Route path="/podcasts" element={ <Podcasts />} />
          <Route path="/episodios" element={ <PodcastEps />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
