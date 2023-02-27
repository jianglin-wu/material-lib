import React, {
  useRef,
  useCallback,
  useEffect,
  useContext,
  Fragment,
} from 'react';
import throttle from 'lodash/throttle';
import useMouseEvent from './useMouseEvent';
import { safeRange } from '../utils/utils';
import { ISize, IPosition, IPagePosition } from '../interface';
import DrawingBoardContext from '../context';

type IMouseInfo = {
  target: HTMLDivElement;
} & ISize &
  IPosition &
  IPagePosition;

/**
 * 宽高大小控制器
 * @param controlPosition 位置获取与更新
 * @param controlSize 大小获取与更新
 * @param drawingBoard 工作区画布大小
 * @returns 上下左右控制器按钮
 */
const useResize = (
  controlPosition: [IPosition, React.Dispatch<React.SetStateAction<IPosition>>],
  controlSize: [ISize, React.Dispatch<React.SetStateAction<ISize>>],
) => {
  const dotTopLeft = useRef<HTMLDivElement>(null);
  const dotTopMiddle = useRef<HTMLDivElement>(null);
  const dotTopRight = useRef<HTMLDivElement>(null);
  const dotMiddleLeft = useRef<HTMLDivElement>(null);
  const dotMiddleRight = useRef<HTMLDivElement>(null);
  const dotBottomLeft = useRef<HTMLDivElement>(null);
  const dotBottomMiddle = useRef<HTMLDivElement>(null);
  const dotBottomRight = useRef<HTMLDivElement>(null);

  const drawingBoard = useContext(DrawingBoardContext);
  const [position, setPosition] = controlPosition;
  const [size, setSize] = controlSize;

  const mouseInfo = useRef<IMouseInfo | null>(null);
  const stateInfo = useRef({
    position,
    size,
    drawingBoard,
  });

  const isOnAnyDotBox = (target: HTMLDivElement) => {
    const boxes = [
      dotTopLeft.current,
      dotTopMiddle.current,
      dotTopRight.current,
      dotMiddleLeft.current,
      dotMiddleRight.current,
      dotBottomLeft.current,
      dotBottomMiddle.current,
      dotBottomRight.current,
    ];
    return boxes.includes(target);
  };

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (isOnAnyDotBox(e.target as HTMLDivElement)) {
        const { position: positionRef, size: sizeRef } = stateInfo.current;
        mouseInfo.current = {
          target: e.target as HTMLDivElement,
          width: sizeRef.width,
          height: sizeRef.height,
          left: positionRef.left,
          top: positionRef.top,
          pageX: e.pageX,
          pageY: e.pageY,
        };
      }
    },
    [stateInfo, mouseInfo],
  );
  const onMouseMove = useCallback(
    throttle((e) => {
      if (mouseInfo.current) {
        const { drawingBoard: drawingBoardRef } = stateInfo.current;
        const prev = mouseInfo.current;
        let left = prev.left;
        let top = prev.top;
        let width = prev.width;
        let height = prev.height;
        // 计算指针像素偏移量
        let offsetY = e.pageY - prev.pageY;
        let offsetX = e.pageX - prev.pageX;
        // 改变上边线框
        if (
          [
            dotTopLeft.current,
            dotTopMiddle.current,
            dotTopRight.current,
          ].includes(prev.target)
        ) {
          const max = prev.top + prev.height;
          top = safeRange(prev.top + offsetY, max);
          height = max - top;
        }
        // 改变左边线框
        if (
          [
            dotTopLeft.current,
            dotMiddleLeft.current,
            dotBottomLeft.current,
          ].includes(prev.target)
        ) {
          const max = prev.left + prev.width;
          left = safeRange(prev.left + offsetX, max);
          width = max - left;
        }
        // 改变右边线框
        if (
          [
            dotTopRight.current,
            dotMiddleRight.current,
            dotBottomRight.current,
          ].includes(prev.target)
        ) {
          width = safeRange(
            prev.width + offsetX,
            drawingBoardRef.width - prev.left,
          );
        }
        // 改变下边线框
        if (
          [
            dotBottomLeft.current,
            dotBottomMiddle.current,
            dotBottomRight.current,
          ].includes(prev.target)
        ) {
          height = safeRange(
            prev.height + offsetY,
            drawingBoardRef.height - prev.top,
          );
        }
        setSize({ width, height });
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

  return (
    <Fragment>
      <div ref={dotTopLeft} className="dot-box top-left" />
      <div ref={dotTopMiddle} className="dot-box top-middle" />
      <div ref={dotTopRight} className="dot-box top-right" />
      <div ref={dotMiddleLeft} className="dot-box middle-left" />
      <div ref={dotMiddleRight} className="dot-box middle-right" />
      <div ref={dotBottomLeft} className="dot-box bottom-left" />
      <div ref={dotBottomMiddle} className="dot-box bottom-middle" />
      <div ref={dotBottomRight} className="dot-box bottom-right" />
    </Fragment>
  );
};

export default useResize;
