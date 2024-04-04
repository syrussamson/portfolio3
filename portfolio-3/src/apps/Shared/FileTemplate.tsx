import React from 'react'

export function FileTemplate({
    img, 
    title,
    whenSelected
    } : {
    img: string, 
    title: string,
    whenSelected: any
}) {

  return (
    <button className='file-component' onDoubleClick={whenSelected} >
    <img src={img} />
    <a>{title}</a>
    </button>
  )
}

export default FileTemplate