import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React,{ useContext, useEffect, useState } from "react";
import Home from './pages/Home';
import Login from './pages/Login';
import PodcastHome from './pages/PodcastHome';
import PodcastEps from './pages/PodcastEps';
import Podcasts from './pages/Podcasts';
import ProjectForm from './pages/ProjectForm';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
          {/* <Route path="/podcast-home/" element={ <PodcastHome />}> */}
          <Route path="/podcast-home/" element={ <PodcastHome />}/>
          <Route path="/podcasts" element={ <Podcasts />} />
          <Route path="/episodios/:id" element={ <PodcastEps />} />
          <Route path="/create-project/:id" element={ <ProjectForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
