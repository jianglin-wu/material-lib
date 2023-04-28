import cn from 'classnames';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Select } from 'antd';
import FieldValue from './FieldValue';

const i = {};
const { Option } = Select;

export const findMetaItem = (metaData, field) => {
  return metaData.find((item) => item.key === field);
};
// 获取操作符配置
export const getOperatorOptions = (metaData, field) => {
  const currentFieldMeta = findMetaItem(metaData, field);
  return currentFieldMeta?.operator || [];
};
// 获取字段值配置
export const getValueOptions = (metaData, field) => {
  const currentFieldMeta = findMetaItem(metaData, field);
  return currentFieldMeta?.value;
};
// 获取字段值叶子节点配置（当字段值类型为 dynamic 时，与 getValueOptions 表现不同，不同 operator 可能对应不能值配置）
export const getValueLeafOptions = (metaData, field, operator) => {
  const valueMetaData = getValueOptions(metaData, field);
  if (valueMetaData.type === 'dynamic') {
    const { mapping = [] } = valueMetaData;
    const currentMetadata = mapping?.find((item) =>
      item?.operator?.includes(operator),
    );
    const subData = currentMetadata?.value || valueMetaData.default;
    return subData;
  }
  return valueMetaData;
};

const FieldRow = ({
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
          className={cn(i.w100p)}
          notFoundContent="暂无数据"
          value={value?.field}
          onChange={(key) => {
            const nextOperatorOptions = getOperatorOptions(metaData, key);
            const defaultOperator = nextOperatorOptions
              ? nextOperatorOptions[0]
              : null;
            onChange({ field: key, operator: defaultOperator });
          }}
        >
          {fieldTypeOptions?.map(({ key, name }) => (
            <Option key={key}>{name}</Option>
          ))}
        </Select>
      </Col>
      <Col flex="96px">
        <Select
          className={cn(i.w100p)}
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
              onChange({ ...value, operator: key });
            } else {
              onChange({ ...value, operator: key, value: undefined });
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
          onChange={(key) => {
            const newValue = valueFormatter ? valueFormatter(key, value) : key;
            onChange({ ...value, value: newValue });
          }}
        />
      </Col>
      <Col flex="66px">
        {canAdd && (
          <PlusCircleOutlined
            className={cn(i.mr10, i.fs20, i.p2, i['secondary-color'], i.cp)}
            onClick={onAddRow}
          />
        )}
        {canRemove && (
          <DeleteOutlined
            className={cn(i.fs20, i.p2, i['secondary-color'], i.cp)}
            onClick={onRemoveRow}
          />
        )}
      </Col>
    </Row>
  );
};

export default FieldRow;
