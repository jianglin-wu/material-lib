export interface ISize {
  width: number;
  height: number;
}
export interface IPosition {
  left: number;
  top: number;
}
export interface IPagePosition {
  pageX: number;
  pageY: number;
}
export interface IControls {
  controlPosition: [IPosition, React.Dispatch<React.SetStateAction<IPosition>>];
  controlSize: [ISize, React.Dispatch<React.SetStateAction<ISize>>];
}
