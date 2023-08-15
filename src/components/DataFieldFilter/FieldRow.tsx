import cn from 'classnames';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Select } from 'antd';
import FieldValue from './FieldValue';
import { IDomainItem, IDomainValueRow, IOperatorMap } from './interfaces';

const { Option } = Select;

export const findMetaItem = (metaData: IDomainItem[], field?: string) => {
  if (!field) {
    return null;
  }
  return metaData.find((item) => item.key === field);
};
// 获取操作符配置
export const getOperatorOptions = (metaData: IDomainItem[], field?: string) => {
  const currentFieldMeta = findMetaItem(metaData, field);
  return currentFieldMeta?.operator || [];
};
// 获取字段值配置
export const getValueOptions = (metaData: IDomainItem[], field?: string) => {
  const currentFieldMeta = findMetaItem(metaData, field);
  return currentFieldMeta?.value;
};
// 获取字段值叶子节点配置（当字段值类型为 dynamic 时，与 getValueOptions 表现不同，不同 operator 可能对应不能值配置）
export const getValueLeafOptions = (
  metaData: IDomainItem[],
  field?: string,
  operator?: string,
) => {
  if (!field) {
    return null;
  }
  const valueMetaData = getValueOptions(metaData, field);
  if (valueMetaData?.type === 'dynamic') {
    const { mapping = [] } = valueMetaData;
    let subData = valueMetaData.default;
    if (operator) {
      const currentMetadata = mapping?.find((item) =>
        item?.operator?.includes(operator),
      );
      subData = currentMetadata?.value || valueMetaData.default;
    }
    return subData;
  }
  return valueMetaData;
};

interface IFieldRowProps {
  metaData: IDomainItem[];
  operatorMap: IOperatorMap;
  canAdd?: boolean;
  canRemove?: boolean;
  onAddRow: () => void;
  onRemoveRow: () => void;
  valueFormatter: (key: string, value: unknown) => void;
  value?: IDomainValueRow;
  onChange?: (value: IDomainValueRow) => void;
}
const FieldRow: React.FC<IFieldRowProps> = ({
  metaData,
  operatorMap,
  canAdd,
  canRemove,
  onAddRow,
  onRemoveRow,
  valueFormatter,
  value,
  onChange,
}) => {
  const fieldTypeOptions = metaData.map(({ name, key }) => ({ name, key }));
  const operatorOptions = getOperatorOptions(metaData, value?.field);
  const valueOptions = getValueOptions(metaData, value?.field);

  return (
    <Row gutter={8} align="top" wrap={false}>
      <Col flex="160px">
        <Select
          className="w-full"
          notFoundContent="暂无数据"
          value={value?.field}
          onChange={(key) => {
            const nextOperatorOptions = getOperatorOptions(metaData, key);
            const defaultOperator = nextOperatorOptions[0];
            onChange?.({ field: key, operator: defaultOperator });
          }}
        >
          {fieldTypeOptions?.map(({ key, name }) => (
            <Option key={key}>{name}</Option>
          ))}
        </Select>
      </Col>
      <Col flex="96px">
        <Select
          className="w-full"
          notFoundContent="暂无数据"
          disabled={!operatorOptions || operatorOptions.length === 0}
          value={value?.operator}
          onChange={(key) => {
            const currentOperatorValueMetaData = getValueLeafOptions(
              metaData,
              value?.field,
              value?.operator,
            );
            const nextOperatorValueMetaData = getValueLeafOptions(
              metaData,
              value?.field,
              key,
            );
            if (currentOperatorValueMetaData === nextOperatorValueMetaData) {
              onChange?.({ ...value, operator: key });
            } else {
              onChange?.({ ...value, operator: key, value: undefined });
            }
          }}
        >
          {operatorOptions?.map((operator) => (
            <Option key={operator}>{operatorMap[operator]}</Option>
          ))}
        </Select>
      </Col>
      <Col flex="auto">
        <FieldValue
          metaData={valueOptions}
          operator={value?.operator}
          value={value?.value}
          onChange={(valueOfValue: any) => {
            const newValue = valueFormatter
              ? valueFormatter(valueOfValue, value)
              : valueOfValue;
            onChange?.({ ...value, value: newValue });
          }}
        />
      </Col>
      <Col flex="66px">
        {canAdd && (
          <PlusCircleOutlined
            className={cn(
              'mr-2.5',
              'text-lg',
              'p-0.5',
              'text-blue-500',
              'cursor-pointer',
            )}
            onClick={onAddRow}
          />
        )}
        {canRemove && (
          <DeleteOutlined
            className={cn(
              'text-lg',
              'p-0.5',
              'text-blue-500',
              'cursor-pointer',
            )}
            onClick={onRemoveRow}
          />
        )}
      </Col>
    </Row>
  );
};

export default FieldRow;
