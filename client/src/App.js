import './App.css';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import LandingPage from './components/Index/LandingPage.jsx';
import CreateRecipe from './components/Recipes/CreateRecipe.jsx';
import Recipes from './components/Recipes/Recipes.jsx';
import RecipeDetail from './components/Recipes/RecipeDetail.jsx';
import React from 'react';


function App() {
  return (
    <React.Fragment>
      <div className='App'>
        <NavBar/>
        <Route exact path={'/'} render={() => <LandingPage/>}/>
        <Route path={'/recipes/:id'} render={(match) => <RecipeDetail match={match}/>}/>
        <Route path={'/recipes'} render={(match) => <Recipes match={match}/>}/>
        <Route path={'/createRecipe'} render={() => <CreateRecipe/>}/>
      </div>
    </React.Fragment>
  );
}

export default App;
