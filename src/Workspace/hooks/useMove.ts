import { useRef, useCallback, useEffect, useContext } from 'react';
import throttle from 'lodash/throttle';
import useMouseEvent from './useMouseEvent';
import { isTargetInside, safeRange } from '../utils/utils';
import { ISize, IPosition, IPagePosition } from '../interface';
import DrawingBoardContext, {
  IDrawingBoardConfig,
  defaultDrawingBoardSize,
} from '../context';

interface IProps {
  editContainer: React.MutableRefObject<HTMLDivElement | null>;
  controlPosition: [IPosition, React.Dispatch<React.SetStateAction<IPosition>>];
  controlSize: [ISize, React.Dispatch<React.SetStateAction<ISize>>];
}
const useMove = ({ editContainer, controlPosition, controlSize }: IProps) => {
  const drawingBoard = useContext(DrawingBoardContext);
  const [position, setPosition] = controlPosition;
  const [size, setSize] = controlSize;

  const mouseInfo = useRef<(IPosition & IPagePosition) | null>(null);
  const stateInfo = useRef<{
    size: ISize;
    position: IPosition;
    drawingBoard: IDrawingBoardConfig;
  }>({
    position,
    size,
    drawingBoard: defaultDrawingBoardSize,
  });

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (
        !(e.target as HTMLDivElement).className
          .split(' ')
          .includes('dot-box') &&
        isTargetInside(e.target as HTMLDivElement, editContainer.current)
      ) {
        const { position: positionRef } = stateInfo.current;
        mouseInfo.current = {
          left: positionRef.left,
          top: positionRef.top,
          pageX: e.pageX,
          pageY: e.pageY,
        };
      }
    },
    [editContainer, stateInfo, mouseInfo],
  );
  const onMouseMove = useCallback(
    throttle((e) => {
      e.preventDefault();
      if (mouseInfo.current) {
        const { size: sizeRef, drawingBoard: drawingBoardRef } =
          stateInfo.current;
        const prev = mouseInfo.current;
        const offsetX = e.pageX - prev.pageX;
        const offsetY = e.pageY - prev.pageY;
        const left = safeRange(
          prev.left + offsetX,
          drawingBoardRef.width - sizeRef.width,
        );
        const top = safeRange(
          prev.top + offsetY,
          drawingBoardRef.height - sizeRef.height,
        );
        setPosition({ left, top });
      }
    }, 24),
    [stateInfo, mouseInfo],
  );
  const onMouseUp = useCallback(() => {
    onMouseMove.flush();
    mouseInfo.current = null;
  }, [onMouseMove, mouseInfo]);

  // 将最新的 state 写到 ref，因为事件监听内直接引入 state 在每次 state 更新后都要重新挂载新的函数，使用 ref 则不会
  useEffect(() => {
    stateInfo.current.position = position;
    stateInfo.current.size = size;
    stateInfo.current.drawingBoard = drawingBoard;
  }, [position, size, drawingBoard]);
  useMouseEvent(onMouseDown, onMouseMove, onMouseUp);

  return [editContainer, [position, setPosition], [size, setSize]];
};

export default useMove;
