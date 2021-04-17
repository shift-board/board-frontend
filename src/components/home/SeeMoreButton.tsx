/** @jsx jsx */
import React, { useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';



interface SeeMoreButtonProps {
  expand: () => void;
  style?: SxStyleProp;
}

/**
 * A button that displays the text `...See More`, expands (custom function that the user
 * passes in), and disappears when clicked.
 *  
 * @returns A see more button. 
 */
export const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({expand: customExpand, style}) => {

  const [visible, setVisible] = useState<boolean>(true);

  const wrapperStyle: SxStyleProp = {
    position: 'absolute',
    //TODO: think of better ways to implement this button
    display: [visible ? 'block' : 'none', 'block'],
    right: 0,
    bottom: 0,
    px: 1,
    ...style,
  };

  const expand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setVisible(false);
    customExpand();
  };
  
  return (
    <div sx={wrapperStyle} onClick={expand}>
      ... See More
    </div>
  );
};