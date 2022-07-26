import React from 'react'
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types'

// default Provider
let Container = ({ children }) => <>{children}</>

Container.propTypes = {
  children: PropTypes.element.isRequired,
}

/**
 * init promise-modal
 * @param {element} CustomContainer
 */
 export const initPromiseModal = ({ CustomContainer } = {}) => {
  Container = CustomContainer || Container
}

const renderModal = (Template, props) => {
  const dom = document.createElement('div')
  dom.setAttribute('class', 'portal-instance-container')
  document.body.appendChild(dom)
  const template = (
    <Container>
      <Template {...props} />
    </Container>
  )
  
  createRoot(dom).render(template)
  return dom
}

export const create = async (template, data = {}, options = {}) => {
  let instance = null
  // unmount
  const unmountedNode = () => {
    setTimeout(() => {
      if (instance) {
        document.body.removeChild(instance)
      }
    }, options.unmountDelay || 0)
  }

  const p = new Promise((resolve, reject) => {
    const props = {
      callbackResolve: resolve,
      callbackReject: reject,
      ...data,
    }
    instance = renderModal(template, props)
  })

  // callbackResolve
  const callbackResolve = val => {
    unmountedNode()
    return Promise.resolve(val)
  }

  // callbackReject
  const callbackReject = err => {
    unmountedNode()
    return Promise.reject(err)
  }

  return p.then(callbackResolve, callbackReject)
}
