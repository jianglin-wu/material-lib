import { getOperatorOptions, getValueLeafOptions } from './FieldRow';

export class CustomError extends Error {
  constructor(fieldIndex, message) {
    super(message);
    this.fieldIndex = fieldIndex;
  }
}

// 表单缺少项提醒（提交时展示错误提示）
export const createListValidator = (metaData) => (_, values) => {
  return Promise.all(
    values.map((value, index) => {
      if (!value) {
        return Promise.reject(new CustomError(index, '请选择字段类型'));
      }
      if (!value.field) {
        return Promise.reject(new CustomError(index, '请选择字段类型'));
      }
      if (!value.operator) {
        return Promise.reject(new CustomError(index, '请选择逻辑运算符'));
      }
      const operatorOptions = getOperatorOptions(metaData, value.field);
      if (!operatorOptions.includes(value.operator)) {
        return Promise.reject(new CustomError(index, '逻辑运算符不存在'));
      }
      if (!value.value || value.value.length === 0) {
        return Promise.reject(new CustomError(index, '请填写输入值'));
      }
      const valueOptions = getValueLeafOptions(
        metaData,
        value.field,
        value.operator,
      );
      if (!valueOptions) {
        return Promise.reject(new CustomError(index, '数据错误'));
      }
      return false;
    }),
  );
};

const validatePattern = (rule, value) => {
  const values = Array.isArray(value) ? value : [value];
  const patterns = Array.isArray(rule.pattern) ? rule.pattern : [rule.pattern];
  const isNotMatch = (text) => {
    return patterns.every((pattern) => !pattern.test(text));
  };
  if (Array.isArray(values) && values.some((item) => isNotMatch(item))) {
    return Promise.reject(rule.message);
  }
};

// 字段值格式错误或用户自定义校验（立即展示错误提示）
export const createValueValidator = (metaData) => (_, value) => {
  if (value && value.field && value.operator) {
    const valueOptions = getValueLeafOptions(
      metaData,
      value.field,
      value.operator,
    );
    const validate = valueOptions?.validate || [];
    return Promise.all(
      validate.map((rule) => {
        if (rule.pattern && value.value) {
          return validatePattern(rule, value.value);
        }
        if (
          rule.validator &&
          typeof rule.validator === 'function' &&
          value.value
        ) {
          return rule.validator(rule, value.value);
        }
        return false;
      }),
    );
  }
  return Promise.resolve();
};
