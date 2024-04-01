import React from 'react'
import Taskbar from './Taskbar'
import Desktop from './Desktop'

function App() {
  return (
    <div className='gui-root'>
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App