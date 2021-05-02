/** @jsx jsx */
import React, { useContext } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';

import { BoardContext, IBoardContext } from '../utils/context';
import { HEADER_HEIGHT_PX } from '../components/Navigation'
import { PostPostForm } from '../components/addpost/PostPostForm'

/**
 * This is the page that allows the user to add a new post.
 * 
 * The post may contain a name, message, or an image.
 * The name is optional, but at least either of the message or image must exist
 * for a successful form submission.
 * 
 * A preview of the photo is also presented once uploaded.
 * 
 * @returns The add-post page. 
 */
export const AddPost: React.FC = () => {
  const board = useContext<IBoardContext>(BoardContext);

  const wrapperStyle: SxStyleProp = {
    pt: [0, HEADER_HEIGHT_PX],
    pb: [HEADER_HEIGHT_PX, 0],
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
  };

  const photoStyle: SxStyleProp = {
    width: '30%',
    height: 'auto',
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
        <PostPostForm />
      </div>
    </div>
  );
};