import { useState, useImperativeHandle } from 'react';
import cls from 'classnames';
import { Row, Col, Form, Button } from 'antd';
import { componentWithModal, IModalInnerRef } from '../ModalContainer';
import FieldRow from './FieldRow';
import {
  CustomError,
  createListValidator,
  createValueValidator,
} from './validator';
import { IDomainItem, IOperatorMap } from './interfaces';

interface IDataFieldFilterAddProps {
  className: string;
  [key: string]: unknown;
}
export const DataFieldFilterAdd: React.FC<IDataFieldFilterAddProps> = ({
  className,
  ...props
}) => (
  <Button type="primary" className={cls(className)} {...props}>
    添加筛选器
  </Button>
);

interface IDataFieldFilterProps {
  metaData: IDomainItem[];
  operatorMap: IOperatorMap;
  valueFormatter: (key: string, value: unknown) => void;
  initialValue: unknown[];
  onSubmit: (dataFilters: unknown) => void;
}
export const DataFieldFilter: React.ForwardRefRenderFunction<
  IModalInnerRef,
  IDataFieldFilterProps
> = (
  { metaData, operatorMap, valueFormatter, initialValue, onSubmit },
  ref,
) => {
  const [form] = Form.useForm();
  const [customErrorInfo, setCustomErrorInfo] =
    useState<CustomError | null>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        onReset: async () => {
          await form.resetFields();
          setCustomErrorInfo(null);
        },
        onOk: async () => {
          try {
            const { dataFilters } = await form.validateFields();
            await createListValidator(metaData)(null, dataFilters);
            setCustomErrorInfo(null);
            const result = await onSubmit?.(dataFilters);
            return result;
          } catch (error) {
            // 自定义的错误信息，需要手动将错误展示出来
            if (error instanceof CustomError) {
              setCustomErrorInfo(error);
              return false;
            }
            // antd 错误会自动展示
            if ((error as any).errorFields) {
              return false;
            }
            throw error;
          }
        },
      };
    },
    [form, setCustomErrorInfo, onSubmit, metaData],
  );

  return (
    <Form name="dynamic_form_item" form={form}>
      <Row gutter={8} className="mb-1.5">
        <Col flex="160px">数据类型</Col>
        <Col flex="96px">逻辑符</Col>
        <Col flex="auto">值</Col>
      </Row>
      <Form.List
        initialValue={initialValue?.length > 0 ? initialValue : [{}]}
        name="dataFilters"
        rules={[
          {
            validator: async (_: unknown, values?: any[]) => {
              if (!values || values.length === 0) {
                return Promise.reject('请添加数据筛选项');
              }
              const fields = values
                ?.filter((item) => item.field)
                ?.map((item) => item.field);
              if (
                fields.some((item, index) => fields.indexOf(item) !== index)
              ) {
                return Promise.reject('筛选字段不能重复');
              }
            },
          },
          // {
          //   required: true,
          //   message: '请添加数据筛选项',
          // },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                required={false}
                key={field.key}
                {...(customErrorInfo && customErrorInfo.fieldIndex === index
                  ? {
                      validateStatus: 'error',
                      help: customErrorInfo.message,
                    }
                  : {})}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      validator: async (rule, value) => {
                        setCustomErrorInfo(null);
                        await createValueValidator(metaData)(rule, value);
                      },
                    },
                  ]}
                  noStyle
                >
                  <FieldRow
                    metaData={metaData}
                    operatorMap={operatorMap}
                    valueFormatter={valueFormatter}
                    // field={field}
                    canAdd={index === fields.length - 1}
                    canRemove={fields.length > 1}
                    onAddRow={() => add({})}
                    onRemoveRow={() => remove(field.name)}
                  />
                </Form.Item>
              </Form.Item>
            ))}
            <Form.ErrorList errors={errors} />
          </>
        )}
      </Form.List>
    </Form>
  );
};

const DataFieldFilterWithModal = componentWithModal<
  IDataFieldFilterProps,
  IDataFieldFilterAddProps
>(DataFieldFilter, DataFieldFilterAdd);

const DEFAULT_OPERATOR_MAP: IOperatorMap = {
  eq: '等于',
  neq: '不等于',
  gt: '大于',
  gte: '大于等于',
  lt: '小于',
  lte: '小于等于',
};

DataFieldFilterWithModal.defaultProps = {
  operatorMap: DEFAULT_OPERATOR_MAP,
  modalProps: {
    title: '数据筛选器',
    width: 718,
  },
};

export default DataFieldFilterWithModal;
