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
 * This contains all the context providers and routing.
 * 
 * Theme provider: enables the app to use the theme specified in `./utils/theme.ts`.
 * 
 * 
 * Routes:  
 * `/` – the main page containing all the posts.  
 * `/add-post` – the page to add new posts.  
 * @returns The app
 */
export const App: React.FC = () => {
  

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path = '/' component={Home} />
          <Route path='/add-post' component={AddPost} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
