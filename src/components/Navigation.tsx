/** @jsx jsx */
import React, { useMemo } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';
import {Link} from 'react-router-dom';
import {BsPlusCircleFill} from 'react-icons/bs';

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

  // TODO: load the board's name from the server 
  const boardName = 'HOME';

  

  // The style of the navbar's main wrapper.
  const wrapperStyle: SxStyleProp = {
    height: '54px',
    width: '100vw',
    px: '5%',
    color: 'primary',
    bg: 'primary',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: [undefined, 0],
    bottom: [0, undefined],
    zIndex: 10,
  };

  // The style of one of the nav items.
  const navItemStyle: SxStyleProp = {
    color: 'text.contrast',
    py: 'auto',
    px: '1em',
    '&:hover': {
      textDecoration: 'none',
      color: 'text.contrast',
      cursor: 'pointer',
      opacity: 0.8,
    },
  };

  // The style of the name of the board. Clicking this item will return to the main board.
  const nameStyle: SxStyleProp = {
    ...navItemStyle,
    justifySelf: 'flex-start',
    mr: 'auto',
    order: 1,
  };

  // The other navbar items excluding the home button.
  //TODO: figure out the necessity of `useMemo` here
  const navItems = useMemo(() => {
    const addStyle: SxStyleProp = {
      fontSize: 'large',
    };

    const links = {
      '/add-post': <BsPlusCircleFill sx={addStyle}/>,
    };

    return Object.keys(links).map(key => {
      return (
        <Link to={key} key={key} sx={navItemStyle}>
          {links[key]}
        </Link>
      );
    });
  }, []);

  // The style of the nav items wrapper.
  const navItemsWrapper: SxStyleProp = {
    justifySelf: 'flex-end',
    ml: 'auto',
    display: 'flex',
    order: 2,
  };

  return (
    <div sx={wrapperStyle}>
      <Link sx={nameStyle} to='/' key='/'>{boardName}</Link>
      <div sx={navItemsWrapper}>{navItems}</div>
    </div>
  );
};