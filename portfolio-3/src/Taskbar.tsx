import React from 'react'
import windows from './assets/windows.png'
import { OpenProcesses } from './Globals'
import { useAtom } from 'jotai'
function Taskbar() {
  const [openProcesses, setOpenProcesses] = useAtom(OpenProcesses)

  return (
    <div className='taskbar-container'>
       <div className='taskbar-left'>
       <div className='start-container'>
            <button className='start-button'>
            <img style={{width: 20, height: 20}} src={windows} />
            <p><i>start</i></p>
            </button>
        </div>
        <div className='minimized-items'>
          {
            openProcesses.map((process) => (
              <button id={process.title} onClick={(e) => setOpenProcesses((prevProcesses) =>
                prevProcesses.map((p) =>
                  p.title === (e.target as HTMLElement).id ? { ...p, minimized: !p.minimized } : p
                )
              )} className={`process-container ${process.minimized && 'minimized'}`}>
              <img className='process-img' src={process.img}/>{process.title}
            </button>
            ))
          }
        </div>
       </div>
        <div className='control-panel-container'>
            msn
        </div>
    </div>
  )
}

export default Taskbar