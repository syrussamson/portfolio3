import React from 'react'
import icon from './assets/icon.png'
function Login() {
  return (
    <div className='login-root'>
        <div className='login-top'>
            <div className='login-container container'>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-end'>
                      <img  src={icon} style={{width: "100%", height: 'auto'}}/>
                      To begin, click on your name
                    </div>
                    <div className='col-6'>
                        <div className='d-flex'>
                        <div className='d-icon'>

                        </div>
                        <div className='header-info'>
                          <h4>Name</h4>
                          
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='login-bottom d-flex justify-content-between align-items-center'>
          <div className='d-flex justify-content-between align-items-center'>
            <h1 className='m-0 p-0'>Turn off computer</h1>
          </div>
        </div>
    </div>
  )
}

export default Login