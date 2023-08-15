import { IDomainItem, IOperatorMap } from '../interfaces';

export const operatorMap: IOperatorMap = {
  '=': '等于',
  '~': '不等于',
  '>': '大于',
  '>=': '大于等于',
  '<': '小于',
  '<=': '小于等于',
  in: '包含',
  like: '包含',
  'not in': '不包含',
};

const typeOptional = [
  {
    key: 'web',
    label: 'Web',
  },
  {
    key: 'mp',
    label: '小程序',
  },
  {
    key: 'app',
    label: 'App',
  },
];

const resultTypeOptional = [
  {
    key: 'success',
    label: '成功',
  },
  {
    key: 'fail',
    label: '失败',
  },
];

// const defaultPortOptions = [80, 443, 22, 3306, 27017].map((port) => ({
//   label: port,
//   value: port,
// }));
// const defaultStatusCodeOptions = [
//   200, 301, 302, 400, 403, 404, 500, 502, 503, 504,
// ].map((port) => ({
//   label: port,
//   value: port,
// }));

export const metaData: IDomainItem[] = [
  {
    name: '类型',
    key: 'type',
    operator: ['=', '~', 'in'],
    value: {
      type: 'dynamic',
      default: {
        type: 'select',
        optional: typeOptional,
        props: {
          mode: 'multiple',
          allowClear: true,
        },
      },
      mapping: [
        {
          operator: ['=', '~'],
          value: {
            type: 'select',
            optional: typeOptional,
          },
        },
      ],
    },
  },
  {
    name: '处理结果',
    key: 'result',
    operator: ['=', '~'],
    value: {
      type: 'select',
      optional: resultTypeOptional,
    },
  },
  {
    name: '目的 IP',
    key: 'server_ip',
    operator: ['=', '~', 'in'],
    value: {
      type: 'dynamic',
      default: {
        type: 'select',
        validate: [
          {
            pattern: [
              // ipv4
              /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
              // ipv6
              /^(?:[A-F0-9]{0,4}:){6,7}[A-F0-9]{1,4}$/,
            ],
            message: '请检查 IP 地址格式是否正确',
          },
        ],
        props: {
          mode: 'tags',
          allowClear: true,
        },
      },
      mapping: [
        {
          operator: ['=', '~'],
          value: {
            type: 'input',
            validate: [
              {
                pattern: [
                  // ipv4
                  /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
                  // ipv6
                  /^(?:[A-F0-9]{0,4}:){6,7}[A-F0-9]{1,4}$/,
                ],
                message: '请检查 IP 地址格式是否正确',
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: '端口',
    key: 'port',
    operator: ['=', '~', '>', '<'],
    value: {
      type: 'dynamic',
      default: {
        type: 'number',
        props: {
          min: 0,
          max: 65535,
        },
        validate: [
          {
            pattern:
              /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: '请检查端口号是否正确',
          },
        ],
      },
    },
  },
  {
    name: '请求方法',
    key: 'method',
    operator: ['=', '~'],
    value: {
      type: 'select',
      optional: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION', 'HEAD'],
    },
  },
  {
    name: '响应码',
    key: 'resp_code',
    operator: ['=', '~', '>', '<'],
    value: {
      type: 'dynamic',
      default: {
        type: 'number',
        props: {
          min: 100,
          max: 599,
        },
        validate: [
          {
            pattern: /^(1|2|3|4|5)\d{2}$/,
            message: '请检查响应码是否正确',
          },
        ],
      },
    },
  },
  {
    name: 'URI',
    key: 'uri',
    operator: ['=', '~', 'like'],
    value: {
      type: 'input',
    },
  },
  {
    name: '域名',
    key: 'domain',
    operator: ['=', '~'],
    value: {
      type: 'input',
      validate: [
        {
          pattern:
            /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
          message: '请检查域名是否正确',
        },
      ],
    },
  },
];

export const fieldKeys = metaData.map(({ key }) => key);
