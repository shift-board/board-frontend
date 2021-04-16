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
 * 
 * 
 * Memoized because we do not want the component to re-render when the main board changes.
 * 
 * @returns A post. 
 */
export const Post: React.FC<PostProps> = React.memo(({post, style}) => {
  //TODO: figure out performance with React.memo and without React.memo

  const {name, message, photo} = post;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [nameHeight, setNameHeight] = useState<number>(0);
  const [messageHeight, setMessageHeight] = useState<number>(0);

  const [overflow, setOverflow] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  

  // STYLES

  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
    color: 'text.primary',
    borderRadius: '4px',
    height: ['auto', expand ? 'auto' : width],
    overflow: 'hidden',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    bg: 'cardBg',
    '&:hover': {
      cursor: 'pointer',
    },
  };


  const imageStyle: SxStyleProp = {
    objectFit: 'cover',
    display: 'block',
    width: ['100%'], 
    height: [width, width-nameHeight-messageHeight],
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
    maxHeight: [expand ? 'auto' : (photo ? '3.5em' : width-nameHeight), photo ? '3.5em' : width-nameHeight],
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

  //TODO: look into less dumb ways to get a square post
  useEffect(() => {
    setWidth(wrapperRef.current.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry: ResizeObserverEntry) => {
        const element: Element = entry.target;

        switch (element) {
          case wrapperRef.current:
            setWidth(entry.contentRect.width);
            break;
          case nameRef.current:
            setNameHeight(element.getBoundingClientRect().height);
            break;
          case messageRef.current:
            setMessageHeight(element.getBoundingClientRect().height);
            if (element.scrollHeight > element.clientHeight) {
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