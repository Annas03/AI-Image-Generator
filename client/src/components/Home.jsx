import React, { useEffect } from 'react'
import { useState } from 'react'
import {loader} from '../assets/index'
import FormField from './FormField'
import ShowCase from './ShowCase'

const Home = () => {
  const [imgList, setImgList] = useState(null)

  useEffect(() => {
    async function fetchPosts(){
      const postList = await fetch('https://ai-image-backend.netlify.app/.netlify/functions/api/get')
      const data = await postList.json()
      setImgList(data.posts)
    }
    fetchPosts()
  },[])

  return (
    <div className='bg-[#f9fafe] h-screen border border-t-slate-200'>
        <div className='pt-8 w-11/12 mx-auto max-w-7xl'>
            <h1 className='font-bold text-3xl'>The Community Showcase</h1>
            <p className='text-slate-500 mt-2'>Browse through a collection of imaginative and visually stunning images generated by DALL-E-AL</p>
        </div>
        <FormField imgList={imgList} setImgList={setImgList}/>
        {!imgList ? <img src={loader} className="w-8 sm:w-10 md:w-14 xl:w-20 mx-auto mt-8"/>:<div className='pt-8 w-11/12 mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl grid-cols-1'>
          {imgList.map((img) => <ShowCase key={img._id} _id={img._id} photo={img.photo} name={img.name} prompt={img.prompt}/>)}
        </div>}
    </div>
  )
}

export default Home