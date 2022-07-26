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
