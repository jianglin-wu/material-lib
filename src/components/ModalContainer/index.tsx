import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
  PropsWithoutRef,
} from 'react';
import { Modal } from 'antd';

export interface IModalInnerRef {
  onOpen?: () => void | Promise<void>;
  onReset?: () => void | Promise<void>;
  onOk?: () => Promise<void | boolean>;
}
export interface IModalOuterRef {
  openWindow: () => void;
}
const ModalContainer = (
  {
    trigger,
    children,
    ...props
  }: {
    trigger: React.ReactHTMLElement<HTMLElement>;
    children: React.ReactElement;
    [key: string]: any;
  },
  ref: React.MutableRefObject<any> | ((instance: any) => void) | null,
) => {
  const [visible, setVisible] = useState(false);
  const innerFormRef = useRef<IModalInnerRef | null>(null);
  const closeWindow = () => setVisible(false);
  const openWindow = useCallback(async () => {
    setVisible(true);
    /*
      背景说明：
      - 以下代码用于重置表单数据，必须将以下代码放置在 setVisible(true) 函数之后，并且放入到一个 setTimeout 中。
      - 当我们修改表单后保存数据，外部对提交的数据有修改，通过 initialValue 将有的值传递进来，再次打开窗口后需要表单的数据与外部数据一致。
        - 例如：弹窗内表单提交了三条数据，然后关闭窗口。页面列表展示了三条数据，并且具有移除功能。删除一条数据后，再打开窗口希望只展示两条数据。
      如何实现：
      - 窗口关闭期间弹窗内部子组件不会运行，感知不到 initialValue 的变化。
      - 如果打开弹窗的同时根据 initialValue 重置表单，由于本次渲染子组件还没运行，此时重置的 initialValue 为关闭窗口最后一次渲染的值，则重置为错误的数据。
      - 所以需要子组件 render 一次接收到新的 initialValue 值后，再去重置就能通过最新的 initialValue 去重置。而要等待子组件先渲染一次，可以通过 setTimeout 将重置任务放入一个新的宏任务里。
     */
    setTimeout(() => innerFormRef?.current?.onOpen?.(), 0);
  }, [setVisible]);

  useImperativeHandle(ref, () => ({ openWindow }), [openWindow]);

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          onClick: openWindow,
        })}
      <Modal
        visible={visible}
        onCancel={closeWindow}
        afterClose={() => innerFormRef?.current?.onReset?.()}
        onOk={async () => {
          const isClose = await innerFormRef?.current?.onOk?.();
          // 只有显式的返回 false 值才会阻止窗口关闭
          if (isClose !== false) {
            closeWindow(); // 内容组件处理完毕后关闭弹窗
          }
        }}
        cancelText="取消"
        okText="确定"
        {...props}
      >
        {React.cloneElement(children, {
          ref: innerFormRef,
        })}
      </Modal>
    </>
  );
};

const ModalContainerForwardFef = React.forwardRef(ModalContainer);
export default ModalContainerForwardFef;

/**
 * 使用高阶组件，为普通组件包裹上 modal 弹窗。
 * @param {*} Component 弹窗中展示的组件
 * @param {*} ComponentTrigger 进入弹窗的操作按钮
 * @returns 具有弹窗功能的入口按钮组件
 */
export const componentWithModal = <T extends {}, P extends {}>(
  Component: React.ForwardRefRenderFunction<IModalInnerRef, T>,
  ComponentTrigger: React.FC<P>,
) => {
  const ComponentForwardRef = React.forwardRef(Component);
  const ComponentForwardRefWithModal: React.FC<
    T & { triggerProps: P; modalProps: any }
  > = ({ triggerProps, modalProps, ...props }) => (
    <ModalContainerForwardFef
      trigger={<ComponentTrigger {...triggerProps} />}
      {...modalProps}
    >
      {/* todo: fix type */}
      <ComponentForwardRef {...(props as any as PropsWithoutRef<T>)} />
    </ModalContainerForwardFef>
  );
  return ComponentForwardRefWithModal;
};
