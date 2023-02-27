import { useRef, useCallback, useEffect, useContext } from 'react';
import throttle from 'lodash/throttle';
import useMouseEvent from './useMouseEvent';
import { isTargetInside, safeRange } from '../utils/utils';
import { ISize, IPosition, IPagePosition, IControls } from '../interface';
import DrawingBoardContext, {
  IDrawingBoardConfig,
  defaultDrawingBoardSize,
} from '../context';

const useMove = (
  editContainer: React.MutableRefObject<HTMLDivElement | null>,
  { controlSize, controlPosition }: IControls,
) => {
  const drawingBoard = useContext(DrawingBoardContext);
  const [position, setPosition] = controlPosition;
  const [size] = controlSize;

  // 存储上一次（鼠标按下和松开期间）鼠标事件的状态
  const mouseInfo = useRef<(IPosition & IPagePosition) | null>(null);
  // 因为事件监听内直接引入 state 在每次 state 更新后都要重新挂载新的函数，使用 ref 则不会
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

  // 将最新的 state 更新到 stateInfo ref
  useEffect(() => {
    stateInfo.current.position = position;
    stateInfo.current.size = size;
    stateInfo.current.drawingBoard = drawingBoard;
  }, [position, size, drawingBoard]);
  // 注册事件
  useMouseEvent(onMouseDown, onMouseMove, onMouseUp);
};

export default useMove;
