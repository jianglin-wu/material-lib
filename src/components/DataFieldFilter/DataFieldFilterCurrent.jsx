import cn from 'classnames';
import { CloseIcon } from './common';
import { findMetaItem, getValueLeafOptions } from './FieldRow';

// TODO:css
const i = {};
const s = {};

// 作用：
// [{ key: a, label: b }] -> { a: b }
const keyLabel2Map = (arr, names = ['key', 'label']) => {
  return arr.reduce((res, cur) => {
    res[cur[names[0]]] = cur[names[1]];
    return res;
  }, {});
};

const DataFieldFilterCurrent = ({
  className,
  metaData,
  operatorMap,
  data,
  onRemove,
  onEdit,
}) => {
  return (
    <div className={cn(i.df, i.mt12, s.currentFilter, className)}>
      <span className={cn(i['pri-cor-ipt'], s.label)}>当前筛选：</span>
      {data?.map(({ field, operator, value }, index) => {
        const left = findMetaItem(metaData, field)?.name || field;
        // 统一值类型为数组
        let valueArr = Array.isArray(value) ? value : [value];
        const valueLeafOptions = getValueLeafOptions(metaData, field, operator);
        const currentSelectNameMap = keyLabel2Map(
          valueLeafOptions?.optional || [],
        );
        if (currentSelectNameMap) {
          valueArr = valueArr.map((item) => currentSelectNameMap[item] || item);
        }
        const operatorText =
          operatorMap && operatorMap[operator]
            ? operatorMap[operator]
            : operator;

        return (
          <span key={field} className={cn(i['main-color'], s.tag)}>
            <span className={cn(i.cp)} onClick={() => onEdit?.(index, field)}>
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
