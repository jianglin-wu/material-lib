import { useRef, useState } from 'react';
import cn from 'classnames';
import DataFieldFilterWithModal from '..';
import DataFieldFilterCurrent from '../DataFieldFilterCurrent';
import { operatorMap, metaData as dataFilterMetaData } from './data-filter';
import { IModalOuterRef } from '../../ModalContainer';

const i: any = {};

const Test = () => {
  const [data, setData] = useState([]);
  const dataFilterRef = useRef<IModalOuterRef | null>(null);
  return (
    <>
      <DataFieldFilterWithModal
        modalProps={{
          ...DataFieldFilterWithModal?.defaultProps?.modalProps,
          ref: dataFilterRef,
        }}
        operatorMap={operatorMap}
        valueFormatter={(valueOfValue: unknown, current: unknown) => {
          console.log(valueOfValue, current);
          return valueOfValue;
        }}
        metaData={dataFilterMetaData}
        triggerProps={{
          className: cn(i.ml12),
        }}
        initialValue={data}
        onSubmit={(payload: any) => {
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
