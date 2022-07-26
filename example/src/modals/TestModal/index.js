import wrap from 'promise-modal'

import TestModal from './TestModal'

export const useTestModal = () => {
  const showTestModal = (data, options = {}) => wrap(TestModal, data, { unmountDelay: 300, ...options })
  return showTestModal
}
