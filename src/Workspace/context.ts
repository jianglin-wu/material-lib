import React from 'react';

export interface IDrawingBoardConfig {
  width: number;
  height: number;
}
export const defaultDrawingBoardSize: IDrawingBoardConfig = {
  width: 0,
  height: 0,
};

const DrawingBoardContext = React.createContext(defaultDrawingBoardSize);

export default DrawingBoardContext;
