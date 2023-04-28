import { useRef, useState } from 'react';
import cn from 'classnames';
import DataFieldFilterWithModal from '..';
import DataFieldFilterCurrent from '../DataFieldFilterCurrent';
import { operatorMap, metaData as dataFilterMetaData } from './data-filter';

const i = {};

const Test = () => {
  const [data, setData] = useState([]);
  const dataFilterRef = useRef(null);
  return (
    <>
      <DataFieldFilterWithModal
        modalProps={{
          ...DataFieldFilterWithModal.defaultProps.modalProps,
          ref: dataFilterRef,
        }}
        operatorMap={operatorMap}
        valueFormatter={(value, current) => {
          console.log(value, current);
          return value;
        }}
        metaData={dataFilterMetaData}
        visibleButtonProps={{
          className: cn(i.ml12),
        }}
        initialValue={data}
        onSubmit={(payload) => {
          console.log('payload:', payload);
          setData(payload);
        }}
      />

      <DataFieldFilterCurrent
        metaData={dataFilterMetaData}
        operatorMap={operatorMap}
        data={data}
        onEdit={() => {
          if (dataFilterRef.current) {
            dataFilterRef.current.openWindow();
          }
        }}
        onRemove={(_, field) => {
          console.log('field:', field);
        }}
      />
    </>
  );
};

export default Test;
