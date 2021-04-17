/** @jsx jsx */
import React from 'react';
import {jsx, SxStyleProp} from 'theme-ui';

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

  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
  };

  return (
    <div sx={wrapperStyle}>
      This is the add post page.
    </div>
  );
};