import React, { useEffect, useState } from 'react'
import {download, like, liked} from '../assets/index'
import FileSaver from 'file-saver'

function ShowCase({photo, name, _id, prompt, Likes, userName, likedPhotos, setLikedPhotos}) {

  const[picLiked, setPicLiked] = useState(()=>likedPhotos!=undefined ? likedPhotos.includes(_id) : false)
  const[likesNum, setLikesNum] = useState(Likes)
  const [likingImage, setLikingImage] = useState(false)

  const downloadImage = (_id, photo) => {
    FileSaver.saveAs(photo, `download_${_id}.jpg`)
  }

  useEffect(()=>{
    setPicLiked(()=>likedPhotos!=undefined ? likedPhotos.includes(_id) : false)
  },[likedPhotos])

  const LikeImage = async () => {
    if(userName){
      setPicLiked((prevState)=> !prevState)
      const req = await fetch(`https://ai-image-backend.netlify.app/.netlify/functions/api/${_id}`, {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({likes : !picLiked ? likesNum+1 : likesNum-1, userName: userName})
      })
      const data = await req.json()
  
      setLikesNum(data.like)
      setLikedPhotos(data.updated_list)
    }
    else{
      alert("Sign In to Like or create Images")
    }
  }

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card m-2">
        <img className="w-full h-auto object-cover rounded-xl" src={photo}/>
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
          <p className="text-white text-sm">{name}</p>
        </div>
        <div className='flex'>
          <p className=" text-white text-sm text-center pr-1.5 mt-0.5">{likesNum >= 1000 ? (likesNum/1000).toFixed(1) + 'K': likesNum}</p>
          {likingImage ? <button type="button" className="outline-none mr-3 bg-transparent border-none" disabled><img src={picLiked ? liked: like} alt="download" className="w-6 h-6 object-contain invert" /></button> : <button type="button" className="outline-none mr-3 bg-transparent border-none" onClick={async () => {setLikingImage(true);await LikeImage();setLikingImage(false)}}><img src={picLiked ? liked: like} alt="download" className="w-6 h-6 object-contain invert" /></button>}
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ShowCase
