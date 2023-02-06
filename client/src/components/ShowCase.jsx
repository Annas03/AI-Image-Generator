import React from 'react'

function ShowCase({photo, name}) {
  return (
    <div className='relative m-2'>
      <div className='absolute bottom-0 bg-slate-700 w-full'>
        <p className='font-bold py-4 pl-4 text-xl z-10 text-white'>{name}</p>
      </div>
      <img className='z-0' src={photo}/>
    </div>
  )
}

export default ShowCase