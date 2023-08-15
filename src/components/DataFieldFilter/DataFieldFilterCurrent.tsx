import cn from 'classnames';
import { CloseIcon } from './common';
import { findMetaItem, getValueLeafOptions } from './FieldRow';
import {
  IDomainItem,
  IDomainValueRow,
  IOperatorMap,
  IDomainValueSelect,
  IOptionalPair,
} from './interfaces';

// 作用：
// [{ key: a, label: b }] -> { a: b }
const keyLabel2Map: (
  arr: IOptionalPair[],
  names?: string[],
) => { [key: string]: string } = (arr, names = ['key', 'label']) => {
  if (!arr) {
    return {};
  }
  return arr.reduce((res, cur) => {
    res[cur[names[0]] as string] = cur[names[1]];
    return res;
  }, {});
};

interface IDataFieldFilterCurrent {
  className?: string;
  metaData: IDomainItem[];
  operatorMap: IOperatorMap;
  data: Required<IDomainValueRow>[];
  onRemove: (index: number, field: string) => void;
  onEdit: (index: number, field: string) => void;
}
const DataFieldFilterCurrent: React.FC<IDataFieldFilterCurrent> = ({
  className,
  metaData,
  operatorMap,
  data,
  onRemove,
  onEdit,
}) => {
  return (
    <div className={cn('flex mt-3 px-6 flex-wrap', className)}>
      <span className={cn('text-blue-500 flex-grow-0 flex-shrink-0 text-sm')}>
        当前筛选：
      </span>
      {data?.map(({ field, operator, value }, index) => {
        const left = findMetaItem(metaData, field)?.name || field;
        // 统一值类型为数组
        let valueArr = Array.isArray(value) ? value : [value];
        const valueLeafOptions = getValueLeafOptions(metaData, field, operator);
        let currentSelectNameMap: { [key: string]: unknown } = {};
        if (
          valueLeafOptions &&
          (valueLeafOptions as IDomainValueSelect)?.optional &&
          typeof (valueLeafOptions as IDomainValueSelect)?.optional?.[0] !==
            'string'
        ) {
          currentSelectNameMap = keyLabel2Map(
            (valueLeafOptions as IDomainValueSelect)
              ?.optional as IOptionalPair[],
          );
        }
        if (currentSelectNameMap) {
          valueArr = valueArr.map((item) => currentSelectNameMap[item] || item);
        }
        const operatorText =
          operatorMap && operatorMap[operator]
            ? operatorMap[operator]
            : operator;

        return (
          <span
            key={field}
            className="text-blue-500 text-sm flex-shrink-0 py-2 px-1 mr-1.5 rounded border border-blue-500 border-solid flex items-center"
          >
            <span
              className="cursor-pointer"
              onClick={() => onEdit?.(index, field)}
            >
              {left} {operatorText} {valueArr.join(',')}
            </span>
            <CloseIcon onClick={() => onRemove?.(index, field)} />
          </span>
        );
      })}
    </div>
  );
};

export default DataFieldFilterCurrent;
