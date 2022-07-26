import { create } from 'promise-modal'

import TestModal from './TestModal'

export const useTestModal = () => {
  const showTestModal = (data, options = {}) => create(TestModal, data, { unmountDelay: 300, ...options })
  return showTestModal
}
