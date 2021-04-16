/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';

import {IPost, Post} from '../components/home/Post';


interface Board {
  title: string;
  description: string;
  bgImage: string;
}


/**
 * This is the home page that displays the board.
 * 
 * Upon loading, it only loads the first 30 posts and requests more as needed to reduce
 * loading time for users.
 * 
 * The photos it loads are not resized but rather cropped to fit inside the square frame.
 * Upon clicking, a popup will appear with the full information about the post and the 
 * original resolution can be seen there.
 * 
 * Desktop view:
 * - multiple columns of posts
 * 
 * Mobile view:
 * - the photo width spans across the entire column
 * 
 * @returns The home page. 
 */
export const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  

  // TODO: get data from server
  const getMorePosts = (index: number, amount: number) => {
    const newPosts: IPost[] = [
      {
        name: 'shari',
        message: null,
        photo: {
          url: 'https://lh3.googleusercontent.com/d/13odY9Hp1vfGhUxV2yUfGbwAzZUJ2Gqhm=w400-h400?authuser=0',
          name: 'lksdjf',
        },
      },
      {
        name: 'joeeeeeeeeeeeeee',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
        photo: {
          url: 'https://lh3.googleusercontent.com/d/1dPt-MIi5eN_WxVkoQ2Y4QA4EE2I7bmKK=w400-h400?authuser=0',
          name: 'ssssssssssss',
        },
      },
      {
        name: 'shari',
        message: `hi sift if u didn't know already i actually love u so much. 
im truly blessed to have met u back then, and im also rlly happy that we got closer. ur responsible and cool
and u do a lot of cool things. but most of all, idk why, i just smile wheenver i look at u. i wanna see u happy,
i wanna make u happy. i wanna stay forever with you. when i think about u, i just think of a smiling u, and its soooooo
ooooooooo cute ^_^ i want u to find me cute, i want u to like me. u make me better and make my life better. u stick
with me and we work things out well. our humours match and we're always on the same frequency. i wanna stick with u,
ur such an amazing person and an amazing boyfriend (ur mine >:)) that is just too rare. i love u and i'll always do so ;)`,
        photo: null,
      },
    ];
    setPosts(posts => [...posts, ...newPosts]);
  };

  //TODO: get these from server
  const board: Board = {
    title: 'Zhang Xian Kai',
    description: 'To my coolest grandpa',
    bgImage: 'https://images.unsplash.com/photo-1528289504374-36139e80ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  };

  //TODO: configure this to load in more posts once the user scrolls down
  useEffect(() => {
    getMorePosts(0, 30);
  }, []);


  

  // STYLES

  const wrapperStyle: SxStyleProp = {
    variant: 'bodyWrapper',
  };

  const titleStyle: SxStyleProp = {
    color: 'text.themed',
    fontSize: 'title',
    fontWeight: 'bold'
  };

  const descriptionStyle: SxStyleProp = {
    color: 'text.themed',
    fontWeight: 'bold',
  };

  const headerStyle: SxStyleProp = {
    backgroundImage: `linear-gradient(#EDEDED99, #EDEDED99), url(${board.bgImage})`,
    backgroundSize: 'cover',
    height: ['100vh', '50vh'],
    py: '10%',
    px: '5%',
  };

  const postWrapperStyle: SxStyleProp = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    mt: '10%',
  };

  const postStyle: SxStyleProp = {
    width: ['100%', '48%', '30%'],
  };

  // COMPONENTS

  const getPosts = () => {
    return posts.map(post => 
      <Post 
        post={post}
        extraStyling={postStyle}
      />
    );
  };


  return (
    <div sx={wrapperStyle}>
      <div sx={headerStyle}>
        <div sx={titleStyle}>{board.title}</div>
        <div sx={descriptionStyle}>{board.description}</div>
      </div>
      <div sx={postWrapperStyle}>{getPosts()}</div>
    </div>
  );
};