/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {jsx, ThemeProvider} from 'theme-ui';
import { Navigation } from './components/Navigation';
import { AddPost } from './pages/AddPost';
import { Home } from './pages/Home';

import {theme} from './utils/theme';

/**
 * The main app.
 * 
 * This contains all the context providers (including the ThemeProvider) and routing.
 * 
 * 
 * Routes:  
 * `/` – the main page containing all the posts.  
 * `/add` – the page to add new posts.  
 * 
 * @returns The app
 */
export const App: React.FC = () => {
  

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path = '/' component={Home} />
          <Route path='/add' component={AddPost} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
