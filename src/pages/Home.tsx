/** @jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import {jsx, SxStyleProp} from 'theme-ui';

import {IPost, Post} from '../components/home/Post';
import { BoardContext, IBoardContext } from '../utils/context';


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

  const board = useContext<IBoardContext>(BoardContext);
  // The posts (information) loaded from the server.
  const [posts, setPosts] = useState<IPost[]>([]);
  // Whether or not all the board posts are loaded.
  const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);
  // The index at which to request the posts at, it'll be more clear as you read through the functions.
  const [index, setIndex] = useState<number>(0);

  

  // TODO: get data from server

  /**
   * This uses to `fetch` API to request more posts from the server.  
   * This is used to ensure that the server can dynamically load posts upon request and
   * not load in everything at once.
   * 
   * For example, if the user wishes to load 30 more posts after seeing 50 posts,
   * this will be `getPosts(50, 30)`. 
   * This is zero-based index with lower bound (the index) inclusive. 
   * 
   * @param index The index to get posts from.
   * @param amount The amount of posts to get.
   * @return The newly retrieved posts.
   */
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
    return newPosts;
  };


  /**
   * Loads 30 more posts from the server.
   */
  const loadMorePosts = () => {
    const amount = 30; // To test infinite scrolling, change this to like 2 (getMorePost returns 3 posts right now)
    const newPosts = getMorePosts(index, amount);
    if (newPosts.length < amount) {
      setFullyLoaded(true);
    }
    setIndex(index => index+amount);
    setPosts(posts => [...posts, ...newPosts]);
  };

  

  // Initial loading
  useEffect(() => { 
    loadMorePosts();
  }, []);

  // Loading more posts
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY >= document.body.offsetHeight) && !fullyLoaded) {
        loadMorePosts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fullyLoaded]);

  


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

  /**
   * Convert the posts information got from server into actual `Post` components.
   * 
   * @returns An array of `Post` components.
   */
  const getPostComponents = () => {
    //TODO: look into memoization and see if this is necessary
    return posts.map(post => 
      <Post 
        post={post}
        style={postStyle}
      />
    );
  };


  return (
    <div sx={wrapperStyle}>
      <div sx={headerStyle}>
        <div sx={titleStyle}>{board.title}</div>
        <div sx={descriptionStyle}>{board.description}</div>
      </div>
      <div sx={postWrapperStyle}>{getPostComponents()}</div>
    </div>
  );
};