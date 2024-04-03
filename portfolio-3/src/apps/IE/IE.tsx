import React from 'react'

function IE() {
  return (
<div className='ie-wrapper' >
    <div className='browser-toolbar'>
        <div className='nav-button-container back-button-container'>
            <button className='nav-button back-button' ><i className='bi bi-arrow-left-short'></i></button><a>Back</a><i className='bi bi-caret-down-fill'></i>
        </div>
        <div className='nav-button-container forward-button-container'>
            <button className='nav-button forward-button'><i className='bi bi-arrow-right-short' /></button><i className='b bi-caret-down-fill'></i>
        </div>
        <div className='toolbar-button'><img></img></div>
        <div className='toolbar-button'><img></img></div>
        <div className='toolbar-button'><img></img></div>
        <div className='toolbar-button-container'><img></img><a>Search</a></div>
        <div className='toolbar-button-container'><img></img><a>Favourites</a></div>
        <div className='toolbar-button history-button'><img></img></div>
        <div className='toolbar-button'><img></img> <i className='bi bi-chevron-down'></i></div>
        <div className='toolbar-button'><img></img></div>
        <div className='toolbar-button'><img alt='fax'></img></div>
        <div className='toolbar-button'><img></img> <i className='bi bi-chevron-down'></i></div>
        <div className='toolbar-button'><img alt='notes'></img></div>
    </div>
    <iframe src="https://bing.com" className='iframe-container' style={{height: '100%', width: '100%'}}>

    </iframe>
</div>
  )
}

export default IE