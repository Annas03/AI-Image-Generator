import React from 'react'
import {download} from '../assets/index'

function ShowCase({photo, name}) {

  const downloadImage = async () => {
    await fetch('http://localhost:5000/api/v1/download', {
      method:"POST",
      headers:{'Content-Type' : 'application/json'},
      body: JSON.stringify({name: name})
    })
  }

  return (
    <div className='relative m-2'>
      <div className='absolute flex justify-between z-10 bottom-0 bg-slate-700 w-full'>
        <p className='font-bold py-4 pl-4 text-xl text-white'>{name}</p>
        <button onClick={downloadImage}>
        <img className='w-6 h-6 items-center mr-4' src={download}/></button>
      </div>
      <img className='z-0' src={photo}/>
    </div>
  )
}

export default ShowCase