import { useState, useRef, cloneElement } from 'react';
import useMove from '../hooks/useMove';
import useResize from '../hooks/useResize';
import { ISize, IPosition } from '../interface';

const DEFAULT_SIZE: ISize = {
  width: 100,
  height: 100,
};
const DEFAULT_POSITION: IPosition = {
  left: 0,
  top: 0,
};

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
  const controlSize = useState<ISize>(
    defaultSize || { width: 100, height: 100 },
  );
  const controlPosition = useState<IPosition>(defaultPosition);

  const editContainer = useRef<HTMLDivElement | null>(null);
  useMove({
    editContainer,
    controlSize,
    controlPosition,
  });
  const dotBoxes = useResize(controlPosition, controlSize);
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
