import React, { useRef, useEffect, useState } from 'react';
import DrawingBoardContext, {
  defaultDrawingBoardSize,
  IDrawingBoardConfig,
} from '../context';

interface IProps {
  className: string;
  style?: Object;
}

/**
 * 拖动工作区底座容器，获取真实的宽高尺寸，通过 context 传递给内部组件。
 */
const DrawingBoard: React.FC<React.PropsWithChildren<IProps>> =
  function DrawingBoard({ children, className, style }) {
    const drawingBoardRef = useRef<HTMLDivElement>(null);
    const [drawingBoardSize, setDrawingBoardSize] =
      useState<IDrawingBoardConfig>(defaultDrawingBoardSize);

    useEffect(() => {
      const drawingBoardDom = drawingBoardRef.current;
      const { width, height } = drawingBoardDom!.getBoundingClientRect();
      setDrawingBoardSize({ width, height });
    }, []);

    return (
      <DrawingBoardContext.Provider value={drawingBoardSize}>
        <div ref={drawingBoardRef} className={className} style={style}>
          {children}
        </div>
      </DrawingBoardContext.Provider>
    );
  };

export default DrawingBoard;
