import ReactKonvaEditor from '../../lib/react-konva-editor';
import Img from './assets/c4315f40e314e782a80b47cb1e51f600.jpg';

const KonvaEditor = () => {
  const stepInfo = [
    {
      type: 'image',
      value: Img,
      x: 0,
      y: 0,
      crop: {
        originWidth: 1500,
        originHeight: 1000,
        width: 500,
        height: 500,
        unit: 'px',
        x: 0,
        y: 0,
      },
    },
    {
      type: 'text',
      value: 'hello',
      x: 10,
      y: 10,
      color: 'red',
    },
  ];

  return (
    <ReactKonvaEditor
      backgroundStyle={{
        backgroundColor: '#F1F3F7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      width={500}
      height={500}
      backgroundColor="#fff"
      maxStep={10}
      stepInfo={stepInfo as any}
    />
  );
};

export default KonvaEditor;
