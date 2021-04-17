import React from 'react';

/**
 * The required fields for a board.
 */
export interface IBoardContext {
  title: string;
  description: string;
  bgImage: string;
}

export const BoardContext = React.createContext<IBoardContext>({
  title: 'HOME',
  description: '',
  bgImage: '',
});