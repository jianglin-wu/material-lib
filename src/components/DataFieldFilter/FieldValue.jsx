import cn from 'classnames';
import { Input, Select, InputNumber } from 'antd';

const i = {};
const { Option } = Select;

const FieldValue = ({ metaData, operator, value, onChange }) => {
  switch (metaData?.type) {
    case 'dynamic':
      const { mapping = [] } = metaData;
      const currentMetadata = mapping?.find((item) =>
        item?.operator?.includes(operator),
      );
      const subData = currentMetadata?.value || metaData.default;
      return (
        <FieldValue
          metaData={subData}
          operator={operator}
          value={value}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <Select
          className={cn(i.w100p)}
          notFoundContent="暂无数据"
          value={value}
          onChange={onChange}
          {...metaData?.props}
        >
          {metaData?.optional?.map((item) => {
            if (typeof item === 'string') {
              return <Option key={item}>{item}</Option>;
            }
            return <Option key={item.key}>{item.label}</Option>;
          })}
        </Select>
      );
    case 'input':
      return (
        <Input
          className={cn(i.w100p)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...metaData?.props}
        />
      );
    case 'number':
      return (
        <InputNumber
          className={cn(i.w100p)}
          value={value}
          onChange={onChange}
          {...metaData?.props}
        />
      );
    default:
      break;
  }

  return <Input className={cn(i.w100p)} disabled />;
};

export default FieldValue;
