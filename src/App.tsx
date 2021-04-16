/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {jsx, ThemeProvider} from 'theme-ui';
import { Navigation } from './components/Navigation';
import { AddPost } from './pages/AddPost';
import { Home } from './pages/Home';
import { BoardContext, IBoardContext } from './utils/context';

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
  
  //TODO: get these from server
  const boardContext: IBoardContext = {
    title: 'Zhang Xian Kai',
    description: 'To my coolest grandpa',
    bgImage: 'https://images.unsplash.com/photo-1528289504374-36139e80ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  };

  return (
    <BoardContext.Provider value={boardContext}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path = '/' component={Home} />
            <Route path='/add-post' component={AddPost} />
          </Switch>
        </Router>
      </ThemeProvider>
    </BoardContext.Provider>
  );
};

export default App;
