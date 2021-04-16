/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';
import {AiOutlineExpandAlt} from 'react-icons/ai';

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
  extraStyling: SxStyleProp;
}

/**
 * 
 * 
 * Memoized because we do not want the component to re-render when the main board changes.
 * 
 * @returns A post. 
 */
export const Post: React.FC<PostProps> = React.memo(({post, extraStyling}) => {
  //TODO: figure out performance with React.memo and without React.memo

  const {name, message, photo} = post;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [nameHeight, setNameHeight] = useState<number>(0);
  const [messageHeight, setMessageHeight] = useState<number>(0);
  

  // STYLES
  
  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
    color: 'text.primary',
    borderRadius: '4px',
    height: ['auto', width],
    overflow: 'hidden',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    bg: 'cardBg',
  };


  const imageStyle: SxStyleProp = {
    objectFit: 'cover',
    display: 'block',
    width: ['100%'], 
    height: [width, width-nameHeight-messageHeight],
  };

  const nameStyle: SxStyleProp = {
    padding: '0.5em',
    fontSize: 'medium',
    bg: 'cardBg',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const messageStyle: SxStyleProp = {
    padding: ['1em', '0.3em'],
    fontSize: 'small',
    bg: 'cardBg',
  };

  const iconStyle: SxStyleProp = {
    fontSize: 'larger',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.8,
    },
  };

  //TODO: make the expanded view
  const expandPost = (event: React.MouseEvent<SVGElement, MouseEvent>) => {

  };

  //TODO: look into less dumb ways to get a square post
  useEffect(() => {
    setWidth(wrapperRef.current.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry: ResizeObserverEntry) => {

        switch (entry.target) {
          case wrapperRef.current:
            setWidth(entry.contentRect.width);
            break;
          case nameRef.current:
            setNameHeight(entry.target.getBoundingClientRect().height);
            break;
          case messageRef.current:
            setMessageHeight(entry.target.getBoundingClientRect().height);
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
    <div sx={{...wrapperStyle, ...extraStyling}} ref={wrapperRef}>
      <div sx={nameStyle} ref={nameRef}>
        {name}
        <AiOutlineExpandAlt sx={iconStyle} onClick={expandPost}/>
      </div>
      {photo ? <img sx={imageStyle} src={photo.url} alt={photo.name}/> : undefined}
      {message ? <div sx={messageStyle} ref={messageRef}>{message}</div> : undefined}
    </div>
  );
});