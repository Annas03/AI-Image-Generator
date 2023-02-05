import React from 'react'
import { useState } from 'react'
import {preview} from '../assets/index'
import {surpriseMePrompts} from "../constants/index"

const CreateImage = () => {
  const [prompt, setPrompt] = useState("")
  const [photo, setPhoto] = useState(preview)

  const randomPrompt = (e) => {
    e.preventDefault()
    setPrompt(surpriseMePrompts[Math.floor(Math.random() * 50)])
  }

  const generateImage = async () => {
    const response = await fetch('http://localhost:5000/api/v1/post', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt: prompt}),
    })
    const data = await response.json()
    console.log(data)
    setPhoto(`data:image/jpeg;base64,${data.photo}`)
  }

  return (
    <div className='bg-[#f9fafe] border border-t-slate-200'>
      <div className='pt-8 w-11/12 mx-auto max-w-7xl'>
        <h1 className='font-bold text-3xl'>Create</h1>
        <p className='text-slate-500'>Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>
      <form className='pt-8 w-11/12 mx-auto max-w-7xl'>
        <label>Your Name</label><br/>
        <input className='border border-slate-400 w-full rounded text-sm p-2 mt-2 focus:outline-none mb-4' placeholder='e.g John Doe'/>
        <label>Prompt</label>
        <button className='ml-2 border rounded text-sm bg-[#EcECF1] font-semibold px-2' onClick={randomPrompt}>surprise me</button><br/>
        <input name='text-area' className='border border-slate-400 w-full rounded text-sm p-2 mt-2 focus:outline-none ' placeholder='Surprise Me' value={prompt} onChange={(e)=>setPrompt(e.target.value)}/>
      </form>
      <div className='pt-8 w-11/12 mx-auto max-w-7xl'>
        <img src={photo} className="mt-7 max-w-xs border-2 rounded"/>
        <button className='border rounded bg-green-600 py-2 px-4 text-white font-semibold mt-4' onClick={generateImage}>Generate</button>
        <p className='mt-6 text-slate-600'>** Once you have created the image you want, you can share it with others in the community **</p>
        <button className='border rounded bg-blue-500 py-2 px-4 text-white font-semibold mt-2 mb-6'>Share with the Community</button>
      </div>
    </div>
  )
}

export default CreateImage