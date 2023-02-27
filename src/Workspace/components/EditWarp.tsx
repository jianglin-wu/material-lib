import { useState, useRef, cloneElement } from 'react';
import useMove from '../hooks/useMove';
import useResize from '../hooks/useResize';
import { ISize, IPosition } from '../interface';
import { DEFAULT_SIZE, DEFAULT_POSITION } from '../constant';

interface IProps {
  children: React.ReactElement;
  defaultSize?: ISize;
  defaultPosition?: IPosition;
}
const EditWarp = ({
  children,
  defaultSize = DEFAULT_SIZE,
  defaultPosition = DEFAULT_POSITION,
}: IProps) => {
  const editContainer = useRef<HTMLDivElement | null>(null);

  const controlSize = useState<ISize>(defaultSize);
  const controlPosition = useState<IPosition>(defaultPosition);
  const controls = {
    controlSize,
    controlPosition,
  };

  useMove(editContainer, controls);
  const dotBoxes = useResize(controls);

  const [position] = controlPosition;
  const [size] = controlSize;
  const childrenStyle = {
    width: size.width,
    height: size.height,
  };

  return (
    <div
      ref={editContainer}
      className="edit-container"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate(${position.left}px, ${position.top}px)`,
      }}
    >
      {dotBoxes}
      {cloneElement(children, { style: childrenStyle })}
    </div>
  );
};

export default EditWarp;
