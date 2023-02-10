import React from 'react'
import { useState } from 'react'

function FormField({imgList, setImgList}) {
  const[ImageSearch, setImageSearch] = useState("")

  const filteredSearch = async (e)=>{
    setImageSearch(e.target.value)
    const images = await getAllImages()
    const fileteredImages = images.filter((img) => img.prompt.search(e.target.value) != -1)
    setImgList(fileteredImages)
  }

  const getAllImages = async () => {
    const postList = await fetch('https://ai-image-backend.netlify.app/.netlify/functions/api/get',
    {
      headers:{'Access-Control-Allow-Origin': '*'}
    })
      const data = await postList.json()
      return data.posts
  }

  return (
    <form className='pt-8 w-11/12 mx-auto max-w-7xl'>
      <label>Search posts</label><br/>
      <input name='text-area' className='border border-slate-400 w-full rounded text-sm p-2 mt-2 focus:outline-none text-slate-500' value={ImageSearch} onChange={filteredSearch} placeholder='Search Something..'/>
    </form>
  )
}

export default FormField