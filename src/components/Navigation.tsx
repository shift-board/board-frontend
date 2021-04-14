/** @jsx jsx */
import React from 'react';
import {jsx, SxStyleProp} from 'theme-ui';
import {Link} from 'react-router-dom';

/**
 * This is the navigation bar that always stay at the top of the webpage for desktop views.
 * On mobile, it won't stick to the top of the screen, meaning it'll only stay on the top
 * of the website.
 * 
 * Desktop view items:
 * - add button that adds a new post
 * 
 * Mobile view items:
 * - None
 * *for mobile view, the add button sticks to the bottom of the page
 * 
 * @returns The navigation bar. 
 */
export const Navigation: React.FC = () => {

  return (
    <div>
      This is the navbar.
    </div>
  );
};