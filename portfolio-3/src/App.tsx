import React from 'react'
import Taskbar from './Taskbar'
import Desktop from './Desktop'
import { Resizable } from 'react-resizable'

function App() {
  return (
    <div className='gui-root'>
        <Desktop />
      <Taskbar />
    </div>
  )
}

export default App