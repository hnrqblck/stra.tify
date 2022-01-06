import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import Home from './pages/Home';
import Login from './pages/Login';
import PodcastHome from './pages/PodcastHome';
import PodcastEps from './pages/PodcastEps';
import Podcasts from './pages/Podcasts';
import ProjectForm from './pages/ProjectForm';
import KitForm from './pages/KitForm';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route exact path="/login" element={ <Login />} />
          <Route exact path="/podcast-home/" element={ <PodcastHome />}/>
          <Route exact path="/podcasts" element={ <Podcasts />} />
          <Route exact path="/episodios/:id" element={ <PodcastEps />} />
          <Route exact path="/create-project/:id" element={ <ProjectForm />} />
          <Route exact path="/create-kit/:showId/:epId" element={ <KitForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
