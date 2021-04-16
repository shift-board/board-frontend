import React from 'react';

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