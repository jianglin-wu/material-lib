import { Input, Select, InputNumber } from 'antd';
import { IDomainValue, IDomainValueRow } from './interfaces';

const { Option } = Select;

interface IFieldValueProps {
  metaData?: IDomainValue;
  operator?: string;
  value: IDomainValueRow['value'];
  onChange: (value: unknown) => void;
}
const FieldValue: React.FC<IFieldValueProps> = ({
  metaData,
  operator,
  value,
  onChange,
}) => {
  switch (metaData?.type) {
    case 'dynamic':
      const { mapping = [] } = metaData;
      let subData = metaData.default;
      if (operator) {
        const currentMetadata = mapping?.find((item) =>
          item?.operator?.includes(operator),
        );
        subData = currentMetadata?.value || metaData.default;
      }
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
          className="w-full"
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
          className="w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...metaData?.props}
        />
      );
    case 'number':
      return (
        <InputNumber
          className="!w-full"
          value={value}
          onChange={onChange}
          {...metaData?.props}
        />
      );
    default:
      break;
  }

  return <Input className="w-full" disabled />;
};

export default FieldValue;
