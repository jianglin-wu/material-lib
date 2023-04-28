export interface IOperatorMap {
  [key: string]: string;
}
export interface IOptionalPair {
  [key: string]: string;
}
type IOptional = string[] | IOptionalPair[];

export interface IDomainValueRow {
  field?: string;
  operator?: string;
  value?: any;
}
export interface IRule {
  pattern?: RegExp | RegExp[];
  validator?: (rule: IRule, value: unknown) => boolean;
  message: string;
}
export interface IDomainValueCommon {
  validate?: IRule[];
  props?: { [key: string]: unknown };
}
export interface IDomainValueInput extends IDomainValueCommon {
  type: 'input';
}
export interface IDomainValueNumber extends IDomainValueCommon {
  type: 'number';
}
export interface IDomainValueSelect extends IDomainValueCommon {
  type: 'select';
  optional?: IOptional;
}
interface IMapping {
  operator: string[];
  value: IDomainValue;
}
export interface IDomainValueDynamic {
  type: 'dynamic';
  default: IDomainValue;
  mapping?: IMapping[];
}
export type IDomainValue =
  | IDomainValueDynamic
  | IDomainValueInput
  | IDomainValueNumber
  | IDomainValueSelect;
export interface IDomainItem {
  name: string;
  key: string;
  operator: string[];
  value: IDomainValue;
}
