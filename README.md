# promise-modal
![version](https://img.shields.io/npm/v/promise-modal)
![size](https://img.shields.io/bundlephobia/min/promise-modal)
![license](https://img.shields.io/npm/l/promise-modal)
![downloads](https://img.shields.io/npm/dw/promise-modal)

## 介绍
promise-modal 是一个把 React Modal 组件创建到 body 根目录并且 Promise 函数式调用的库

## 安装
```
npm i promise-modal
```

## 使用
### 你的 Modal 组件这样写，我们会传入 `callbackResolve`和 `callbackReject` 两个 props 到你的组件中，你需要在关闭 Modal 的时候调用它们。
```jsx
import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'

const TestModal = props => {
  const { title, callbackResolve, callbackReject } = props
  const [isModalVisible, setIsModalVisible] = useState(true)

  const handleOk = () => {
    setIsModalVisible(false)
    callbackResolve(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    callbackReject(false)
  }

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

TestModal.propTypes = {
  title: PropTypes.string.isRequired,
  callbackResolve: PropTypes.func.isRequired,
  callbackReject: PropTypes.func.isRequired,
}
export default TestModal
```
### 把你的 Modal 组件传入 create 函数
```javascript
import { create } from 'promise-modal'
import TestModal from './TestModal'

// 如果你使用 Class 组件
export default (data) => create(TestModal, data)

// 如果你使用函数式组件和 hooks，你必须创建一个自定义 hooks 返回
export const useTestModal = () => {
  const showTestModal = (data) => create(TestModal, data)
  return showTestModal
}
```
### 业务代码中使用 Modal
```javascript
import { useTestModal } from './modals/TestModal'

const showTestModal = useTestModal()

showTestModal({
  title: 'Test Modal'
})
.then((response) => {
  console.log('response: ', response)
}).catch((error) => {
  console.log('error: ', error)
})
```

### 自定义 Container
```jsx
// your app.js
import { initPromiseModal } from 'promise-modal'

const CustomContainer = ({ children }) => (
  <Provider store={store}>
    <ConfigProvider locale={getAntLocale()}>{children}</ConfigProvider>
  </Provider>
)

CustomContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

useEffect(() => {
  initPromiseModal({
    CustomContainer,
  })
}, [])

```

## API
### create 方法

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必传 |
| --- | --- | --- | --- | --- | --- |
| template | Modal 组件 |   ReactComponent | -| - | 是 |
| data | 组件 props | Object |-  | {} | 否 |
| options | 配置项 | Object |-  | {} | 否 |
| options.unmountDelay | 延迟销毁时长(毫秒) | Number |-  | 0 | 否 |

### initPromiseModal
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必传 |
| --- | --- | --- | --- | --- | --- |
| CustomContainer | 自定义 Container |   ReactComponent | -| - | 是 |

## License

promise-modal is released under the MIT License. See the bundled
[LICENSE](./LICENSE) file for details.
