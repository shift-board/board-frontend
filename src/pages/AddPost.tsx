/** @jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';

import { BoardContext, IBoardContext } from '../utils/context';
import { HEADER_HEIGHT_PX } from '../components/Navigation'

/**
 * This is the page that allows the user to add a new post.
 * 
 * The post may contain a name, message, or images.
 * The name is optional, but at least either of the message or image must exist
 * for a successful form submission.
 * 
 * It also displays a preview of the photos once they are uploaded.
 * 
 * @returns The add-post page. 
 */
export const AddPost: React.FC = () => {
  const board = useContext<IBoardContext>(BoardContext);

  const [height, setHeight] = useState<number>(window.innerHeight)

  /**
   * Changes this add post page's height.
   */
  const adjustHeight = () => {
    setHeight(window.innerHeight)
  }

  // TODO: figure out more efficient way of making sure the main body is the
  // right height.
  useEffect(() => {
    window.addEventListener('resize', adjustHeight)

    return () => {
      window.removeEventListener('resize', adjustHeight)
    }
  }, [])

  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
    height: height - HEADER_HEIGHT_PX,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  };

  const photoStyle: SxStyleProp = {
    width: '30%',
    height: '100%',
    backgroundImage: `linear-gradient(#EDEDED99, #EDEDED99), url(${board.bgImage})`,
    backgroundSize: 'cover',
  }

  const formContainerStyle: SxStyleProp = {
    width: '70%',
    height: '100%',
  }

  return (
    <div sx={wrapperStyle}>
      <div sx={photoStyle} />
      <div sx={formContainerStyle}>
        // FORM COMPONENT GOES HERE
      </div>
    </div>
  );
};