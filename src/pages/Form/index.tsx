import AdvancedForm from '../../components/AdvancedForm';
import DataFieldFilterTest from '../../components/DataFieldFilter/example';

function FormPage() {
  const formItemProps = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const fromItems = [
    {
      label: '国家',
      field: 'country',
      type: 'select',
      formItemProps,
    },
    {
      label: '省份',
      field: 'province',
      type: 'select',
      formItemProps,
      dependencies: ['country'],
    },
    {
      label: '城市',
      field: 'city',
      type: 'select',
      formItemProps,
      dependencies: ['province'],
    },
    {
      label: '区县',
      field: 'region',
      type: 'select',
      formItemProps,
      dependencies: ['city'],
    },
    {
      label: '街道',
      field: 'street',
      type: 'select',
      formItemProps,
      dependencies: ['region'],
    },
    {
      type: 'button',
      value: '提交',
    },
  ];
  return (
    <>
      <AdvancedForm
        formItems={[
          {
            type: 'grid',
            colProps: {
              span: 8,
            },
            children: fromItems,
          },
        ]}
      />
      <DataFieldFilterTest />
    </>
  );
}

export default FormPage;
