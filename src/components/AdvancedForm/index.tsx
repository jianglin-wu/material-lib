import { useMemo } from 'react';
import { Form, Input, Select, FormItemProps, Row, Col, ColProps } from 'antd';

type ILayoutType = 'grid';
interface ILayoutItem<T> {
  type: ILayoutType | string;
  colProps?: ColProps;
  children?: T[] | null;
}

type IItemType =
  | 'input'
  | 'select'
  | 'numberInput'
  | 'textarea'
  | 'checkbox'
  | 'radio';

interface ICommonItem<T> {
  field: string;
  label: string;
  type: IItemType | string;
  formItemProps?: FormItemProps;
  dependencies?: string[];
  children?: T[] | null;
}

interface IInputItem<T> extends ICommonItem<T> {}
interface ISelectItem<T> extends ICommonItem<T> {}

type IFormItem = IInputItem<IItems> | ISelectItem<IItems>;
type IItems = IFormItem | ILayoutItem<IItems>;

interface IProps {
  formItems: IItems[];
}

const FormItem = ({ type }: Partial<IFormItem>) => {
  switch (type) {
    case 'input':
      return <Input />;
    case 'select':
      return <Select />;
    default:
      break;
  }
  return null;
};

const GridItem = ({ layoutItem }: { layoutItem: ILayoutItem<IItems> }) => {
  const { children, colProps } = layoutItem;
  return (
    <Row>
      {children?.map((item: IItems) => {
        return (
          <Col key={(item as any).key} {...colProps}>
            <AdvancedFormItem formItem={item} />
          </Col>
        );
      })}
    </Row>
  );
};

const AdvancedFormItem = ({ formItem }: { formItem: IItems }) => {
  if (formItem.type === 'grid') {
    return <GridItem layoutItem={formItem} />;
  }
  const { label, type, formItemProps } = formItem as IFormItem;
  return (
    <Form.Item label={label} {...formItemProps}>
      <FormItem type={type} />
    </Form.Item>
  );
};

interface IListItem {
  children?: IListItem[] | null;
}
interface IListItemKey<T> extends IListItem {
  // [a in keyof Omit<T, ['children', 'key']>]: T[P];
  key: string;
  children?: IListItemKey<T>[] | null;
}
const recursion = <T extends IListItem>(
  node: T[] | null | undefined,
  path: number[],
): IListItemKey<T>[] | null => {
  if (!node || node.length === 0) {
    return null;
  }
  return node.map((item: T, index: number) => {
    const currentPath = [...path, index];
    return {
      ...item,
      key: currentPath.join('-'),
      children: recursion(item.children, currentPath),
    };
  });
};
const useAddKey = <T extends IListItem>(data: T[]) => {
  return useMemo(() => {
    return recursion(data, []);
  }, [data]);
};

const AdvancedFrom = (props: IProps) => {
  const { formItems } = props;
  const dataSource = useAddKey<IItems>(formItems);
  console.log('dataSource:', dataSource);
  return (
    <Form>
      {dataSource?.map((formItem) => {
        return (
          <AdvancedFormItem
            key={formItem.key}
            formItem={formItem as any as IItems}
          />
        );
      })}
    </Form>
  );
};

export default AdvancedFrom;
