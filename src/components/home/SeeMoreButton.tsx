/** @jsx jsx */
import React, { useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';



interface SeeMoreProps {
  expand: () => void;
  style?: SxStyleProp;
}

/**
 * A button that disappears if clicked (on mobile view).
 * 
 * You can pass in an `expand` function that executes when the button is clicked.
 * 
 * @returns A see more button. 
 */
export const SeeMoreButton: React.FC<SeeMoreProps> = ({expand: customExpand, style}) => {

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