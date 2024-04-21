 import cancel from '../../assets/cancel.png'
import refresh from '../../assets/refresh.png'
import home from '../../assets/hnetwiz.dll_14_10000-3.png'
import favourites from '../../assets/1363.png'
import search from '../../assets/shell32.dll_14_23-4.png'
import reverse from '../../assets/reverse.png'
import mail from '../../assets/sendmail.dll_14_2001-3.png'
import print from '../../assets/comdlg32.dll_14_540-3.png'
import notes from '../../assets/note.png'
import notes2 from '../../assets/note2.png'

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
        <div className='toolbar-button'><img src={cancel} ></img></div>
        <div className='toolbar-button'><img src={refresh}></img></div>
        <div className='toolbar-button  divider'><img src={home}></img></div>
        <div className='toolbar-button' ><img src={search}></img><a>Search</a></div>
        <div className='toolbar-button' ><img src={favourites}></img><a>Favourites</a></div>
        <div className='toolbar-button history-button divider'><img src={reverse}></img></div>
        <div className='toolbar-button'><img src={mail}></img> <i className='bi bi-caret-down-fill'></i></div>
        <div className='toolbar-button'><img src={print}></img></div>
        <div className='toolbar-button'><img src={notes}></img></div>
        <div className='toolbar-button'><img alt='notes' src={notes2}></img></div>
    </div>
    <iframe src="https://bing.com" className='iframe-container' style={{height: '100%', width: '100%'}}>

    </iframe>
</div>
  )
}

export default IE