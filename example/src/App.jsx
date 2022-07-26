import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd'
import { useTestModal } from './modals/TestModal'

function App() {
  const showTestModal = useTestModal()

 const showModal = async () => {
    showTestModal({
      title: 'Test Modal'
    })
    .then((response) => {
      console.log('response: ', response)
    }).catch((error) => {
      console.log('error: ', error)
    })
  }

  return (
    <div className="App">
      <Button Button type="primary" onClick={showModal}>show modal</Button>
    </div>
  )
}

export default App
