/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';
import {AiOutlineExpandAlt} from 'react-icons/ai';
import { SeeMoreButton } from './SeeMoreButton';

export interface IPost {
  name: string;
  message: string;
  photo: {
    url: string;
    name: string;
  };
}

interface PostProps {
  post: IPost;
  style?: SxStyleProp;
}

/**
 * A component representing a post. This is clickable on both desktop and mobile view
 * and expands into a full popup.
 * 
 * This is memoized because we do not want the component to re-render when the main board changes
 * since requesting for the photo is pretty expensive.
 * 
 * Desktop view:
 * - Spans a couple columns depending on the window size. 
 * - The post is a square.
 * - If there is a photo, then the message component height is constrained.
 * - Message does not expand, it will go to the popup if clicked.
 * 
 * Mobile view:
 * - Spans full width.
 * - The image is a square.
 * - If the `...See More` button is clicked, the message will expand.
 * 
 * @returns A post. 
 */
export const Post: React.FC<PostProps> = React.memo(({post, style}) => {
  //TODO: figure out performance with React.memo and without React.memo

  const {name, message, photo} = post;

  /**
   * `wrapperWidth`, width of the main wrapper component – used for when making sure the entire post
   * is a square or for making the image a square.  
   * `nameHeight`, height of the component that displays the name – used for computing
   * the available space left when constraining the post to a square.  
   * `messageHeight`, height of the component that displays the message – used for computing the 
   * available space for displaying the image if the message is present.
   * 
   * The refs refers to its corresponding components.
   */
  const [wrapperWidth, setWrapperWidth] = useState<number>(0);
  const [nameHeight, setNameHeight] = useState<number>(0);
  const [messageHeight, setMessageHeight] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Whether or not the message overflows the message component.
  const [overflow, setOverflow] = useState<boolean>(false);
  // Whether or not the message is expanded.
  const [expand, setExpand] = useState<boolean>(false);
  

  // STYLES

  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
    color: 'text.primary',
    borderRadius: '4px',
    height: ['auto', expand ? 'auto' : wrapperWidth],
    overflow: 'hidden',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    bg: 'cardBg',
    '&:hover': {
      cursor: 'pointer',
    },
    maxHeight: expand ? 'auto' : 800,
  };


  const imageStyle: SxStyleProp = {
    objectFit: 'cover',
    display: 'block',
    width: ['100%'], 
    height: [wrapperWidth, wrapperWidth-nameHeight-messageHeight],
  };

  const nameStyle: SxStyleProp = {
    padding: photo ? '0.5em' : '1em',
    fontSize: 'medium',
    bg: 'cardBg',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const messageStyle: SxStyleProp = {
    px: photo ? '0.3em' : '1em',
    borderBottom: '0.3em solid',
    borderColor: 'cardBg',
    fontSize: 'small',
    bg: 'cardBg',
    maxHeight: [expand ? 'auto' : (photo ? '3.5em' : wrapperWidth-nameHeight), photo ? '3.5em' : wrapperWidth-nameHeight],
    overflow: 'hidden',
    position: 'relative',
  };

  const iconStyle: SxStyleProp = {
    fontSize: 'larger',
    display: ['none', 'block'],
  };

  const expandButtonStyle: SxStyleProp = {
    bg: 'cardBg',
    right: photo ? '0.3em' : '1em', 
    bottom: 0,
  };

  //TODO: make the expanded view
  const popup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

  };

  /**
   * A resize observer is used to update the following dimension changes whenever the user
   * resizes the browser/page:  
   * - `wrapperWidth`, width of the main wrapper component – used for when making sure the entire post
   * is a square or for making the image a square.  
   * -  `nameHeight`, height of the component that displays the name – used for computing
   * the available space left when constraining the post to a square.  
   * - `messageHeight`, height of the component that displays the message – used for computing the 
   * available space for displaying the image if the message is present.
   */
  useEffect(() => {
    setWrapperWidth(wrapperRef.current.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry: ResizeObserverEntry) => {
        const element: Element = entry.target;

        switch (element) {
          case wrapperRef.current:
            setWrapperWidth(entry.contentRect.width);
            break;
          case nameRef.current:
            setNameHeight(element.getBoundingClientRect().height);
            break;
          case messageRef.current:
            setMessageHeight(element.getBoundingClientRect().height);
            if (element.scrollHeight > element.getBoundingClientRect().height) {
              //TODO: fix this bug of overflow detection
              console.log(element.scrollHeight, element.getBoundingClientRect().height);
              setOverflow(true);
            }
            break;
          default:
            throw new Error('unregistered element');
        }
      });
    });

    ro.observe(wrapperRef.current);
    if (nameRef.current) ro.observe(nameRef.current);
    if (messageRef.current) ro.observe(messageRef.current);
    return () => ro.disconnect();
  }, [nameRef.current, messageRef.current]);

  
  return (
    <div sx={{...wrapperStyle, ...style}} ref={wrapperRef} onClick={popup}>
      <div sx={nameStyle} ref={nameRef}>
        {name}
        <AiOutlineExpandAlt sx={iconStyle} />
      </div>
      {photo ? <img sx={imageStyle} src={photo.url} alt={photo.name}/> : undefined}
      {message ? 
        <div sx={messageStyle} ref={messageRef}>
          {message}
          {overflow ? <SeeMoreButton expand={() => setExpand(true)} style={expandButtonStyle}/> : undefined}
        </div> 
        : undefined}
    </div>
  );
});