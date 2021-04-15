/** @jsx jsx */
import React from 'react';
import {jsx, SxStyleProp} from 'theme-ui';

/**
 * This is the home page that displays the board.
 * 
 * Upon loading, it only loads the first 30 posts and requests more as needed to reduce
 * loading time for users.
 * 
 * The photos it loads are not resized but rather cropped to fit inside the square frame.
 * Upon clicking, a popup will appear with the full information about the post and the 
 * original resolution can be seen there.
 * 
 * Desktop view:
 * - multiple columns of posts
 * 
 * Mobile view:
 * - the photo width spans across the entire column
 * 
 * @returns The home page. 
 */
export const Home: React.FC = () => {
  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
    height: '200vh',
  };

  return (
    <div sx={wrapperStyle}>
      This is the home page.
    </div>
  );
};