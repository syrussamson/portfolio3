import React from 'react'
import windows from './assets/windows.png'

function Taskbar() {
  return (
    <div className='taskbar-container'>
        <div className='start-container'>
            <button className='start-button'>
            <img style={{width: 20, height: 20}} src={windows} />
            <p><i>start</i></p>
            </button>
        </div>
        <div className='control-panel-container'>
            msn
        </div>
    </div>
  )
}

export default Taskbar