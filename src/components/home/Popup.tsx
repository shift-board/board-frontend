/** @jsx jsx */
import React, {useEffect} from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { jsx, SxStyleProp } from 'theme-ui';

import { fadeIn } from '../../utils/animation';
import { IPost } from '../../utils/interface';

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
 * A popup can only be for posts that have an image. If a popup is formed
 * from a post that has no image, no popup will show.
 * 
 * Clicking the X button or the borders of the popup will close the popup.
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

  // Prevent the body from scrolling in a popup
  useEffect(() => {
    // Haha, get it? Old overflow = oldverflow?
    const oldverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    
    return () => {
      document.body.style.overflow = oldverflow;
    };
  }, [])

  const popupDiv: SxStyleProp = {
    position: 'fixed',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'popup.popupBg',
    top: 0,
    left: 0,
    zIndex: 1000,

    '@keyframes fadeIn': fadeIn,
    animationName: 'fadeIn',
    animationDuration: '0.25s',
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
    visibility: ['collapse', 'visible'],
  }

  const authorTextStyle: SxStyleProp = {
    fontSize: 'medium',
    fontFamily: 'body',
  }

  const lineStyle: SxStyleProp = {
    border: '1px solid gray',
    height: '2px',
    width: '100%',
    margin: 'auto',
    mb: '7%'
  }

  const textBoxStyle: SxStyleProp = {
    overflowY: 'auto',
    width: '100%',    
    maxHeight: '85%',
    '&::-webkit-scrollbar': {
      width: '0.5em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      outline: '1px solid slategrey'
    }
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

  // In the event that this popup is created somehow with no photo, generate
  // empty element instead of throwing an error.
  if (!photo) {
    return <React.Fragment></React.Fragment>
  }

  return (
    <div sx={popupDiv}>
      <div sx={photoRegionDiv} onClick={closeHandler}>
        <div sx={borderStyle}>
          <RiCloseCircleLine color='white' size={30} sx={returnButtonStyle} onClick={closeHandler}/>
        </div>
        <div sx={photoContainerStyle}> 
          <img src={photo.url} alt={photo.name} sx={photoStyle} onClick={consumeMouseInteraction} />
        </div>
        <div sx={borderStyle} />
      </div>
      <div sx={textRegionDiv}>
        <h3 sx={authorTextStyle}>{name}</h3>
        <div sx={lineStyle} />
        <div sx={textBoxStyle}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
 
export default Popup;