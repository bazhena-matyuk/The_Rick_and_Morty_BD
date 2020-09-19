import React from 'react';
import './App.css';
import Header from '../Header';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import CharactersList from '../CharactersList';
import CharacterPage from '../CharacterPage';
import LocationsList from '../LocationsList';
import LocationPage from '../LocationPage';
import EpisodesList from '../EpisodesList';
import EpisodePage from '../EpisodePage';
import Homepage from '../Homepage';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/characters">
            <CharactersList />
          </Route>
          <Route path={`/character/:id`}>
            <CharacterPage />
          </Route>
          <Route path="/locations">
            <LocationsList />            
          </Route>
          <Route path={`/location/:id`}>
            <LocationPage />
          </Route>
          <Route path="/episodes">
            <EpisodesList />
          </Route>
          <Route path={`/episode/:id`}>
            <EpisodePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
