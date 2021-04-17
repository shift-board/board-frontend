/** @jsx jsx */
import React from 'react';
import { jsx, SxStyleProp } from 'theme-ui';

import { IPost } from '../../utils/interface';
import { RiCloseCircleLine } from 'react-icons/ri';

export interface PopupProps {
  /** The post details. */
  post: IPost;
  /** The callable that is called once the close button is pressed. */
  closeHandler: () => void;
}

/**
 * A component representing a popup for a post.
 * 
 * This popup will occur once a post is clicked, and contains the full
 * message, the author's name, and the picture in its original
 * aspect ratio.
 * 
 * Desktop view:
 *  - Spans the entire page
 *  - The image area is about 60% of the width, and the text area is the rest
 *  - A small header above the image area contains the exit button
 * 
 * Mobile view:
 *  - Only the picture will be shown in mobile view, as the text can be
 *    easily found by clicking the description.
 * 
 * @returns the popup of a post.
 */
const Popup: React.FC<PopupProps> = ({post, closeHandler}) => {
  const {name, message, photo} = post;

  const popupDiv: SxStyleProp = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'popup.popupBg',
    top: '0%',
    zIndex: 1000,
  }

  const photoRegionDiv: SxStyleProp = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: ['100vw', '65vw'],
    ml: 0,
    mr: 'auto',
  }

  const textRegionDiv: SxStyleProp = {
    height: '100vh',
    width: '35vw',
    mr: 0,
    ml: 'auto',
    px: '2%',
    py: '2%',
    backgroundColor: 'popup.textBg',
    visibility: ['collapse', 'visible']
  }

  const authorTextStyle: SxStyleProp = {
    fontSize: 'fontSizes.medium',
    fontFamily: 'fonts.body',
  }

  const lineStyle: SxStyleProp = {
    border: '1px solid gray',
    height: '2px',
    width: '100%',
    margin: 'auto',
    mb: '7%'
  }

  const borderStyle: SxStyleProp = {
    backgroundColor: 'primary',
    width: '100%',
    height: '7%',
    display: 'flex',
    flexDirection: 'row'
  }

  const photoContainerStyle: SxStyleProp = {
    height: `${100 - parseInt(borderStyle.height.toString()) * 2}%`,
    width: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'center'
  }

  const photoStyle: SxStyleProp = {
    objectFit: 'contain',
    maxHeight: '100%',
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
  }

  const returnButtonStyle: SxStyleProp = {
    my: 'auto',
    border: '2px solid green',
    ml: '1%',
    color: 'white'
  }

  /**
   * Consumes (stops the propagation of) a mouse event.
   * 
   * Nested DOM elements propagate events to parent DOM elements, which can
   * occasionally be unideal. This method stops the propagation.
   * 
   * @param evt The mouse event to be consumed.
   */
  const consumeMouseInteraction = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.stopPropagation();
  }

  return (
    <div sx={popupDiv}>
      <div sx={photoRegionDiv} onClick={closeHandler}>
        <div sx={borderStyle}>
          <RiCloseCircleLine color='white' size={30} sx={returnButtonStyle} onClick={closeHandler}/>
        </div>
        <div sx={photoContainerStyle} onClick={consumeMouseInteraction}> 
          <img src={photo.url} alt="" sx={photoStyle} />
        </div>
        <div sx={borderStyle} />
      </div>
      <div sx={textRegionDiv}>
        <h3 sx={authorTextStyle}>{name}</h3>
        <div sx={lineStyle} />
        <p>{message}</p>
      </div>
    </div>
  );
}
 
export default Popup;