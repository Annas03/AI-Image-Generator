import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {preview, loader} from '../assets/index'
import {surpriseMePrompts} from "../constants/index"

const CreateImage = ({setImages, userName, setLoggedIn, loggedIn}) => {
  const [prompt, setPrompt] = useState("")
  const [photo, setPhoto] = useState(preview)
  const [generatingImage, setgeneratingImage] = useState(false)
  const [sharingImage, setSharingImage] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    async function AuthorizeUser(){
      const res = await fetch('https://ai-image-backend.netlify.app/.netlify/functions/api/Authorize',{
        method:'POST',
        headers:{
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*'
        }
      })
      const data = await res.json()
      if(data.err) navigate('/login')
    }
    AuthorizeUser()
    setTimeout(() => {
      setLoggedIn(true)
    }, 3000);
  },[])

  const randomPrompt = () => {
    setPrompt(surpriseMePrompts[Math.floor(Math.random() * 50)])
  }

  const generateImage = async () => {
    setgeneratingImage((prevState)=>!prevState)
    try{
      if(prompt!=""){
        const response = await fetch(`https://ai-image-backend.netlify.app/.netlify/functions/api/post`, {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': localStorage.getItem('token')
          },
          body: JSON.stringify({prompt: prompt, name:userName})
        })
        const data = await response.json()
        setPhoto(`data:image/jpeg;base64,${data.photo}`)
      }
    }
    catch(error){
      alert(error)
    }
    finally{
      setgeneratingImage((prevState)=>!prevState)
    }
  }

  const shareImage = async (e) =>{
    setSharingImage((prevState) => !prevState)
    e.preventDefault()
    try{
      if(userName!="" && prompt!="" && photo){
        const response = await fetch(`https://ai-image-backend.netlify.app/.netlify/functions/api/share`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({name: userName, prompt:prompt, photo: photo})
        })
        navigate('/')
      }
    }
    catch(error){
      alert("Form Invalid/Incomplete")
    }
    finally{
      setImages((prevState) => prevState+=1)
      setSharingImage((prevState) => !prevState)
    }
  }

  return (
    <div className='bg-[#f9fafe] border border-t-slate-200 relative'>
      {!loggedIn && 
            <div className='bg-green-500 rounded w-48 absolute right-0'>
              <p className='px-1.5 py-2 text-center text-white font-semibold'>Successfully Logged In</p>
              <div className='w-full h-1 rounded bg-green-700 animate-progressbar'></div>
            </div>}
      <div className='pt-8 w-11/12 mx-auto max-w-7xl'>
        <h1 className='font-bold text-3xl'>Create</h1>
        <p className='text-slate-500'>Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>
      <div className='pt-8 w-11/12 mx-auto max-w-7xl'>
        <label>Your Name</label><br/>
        <input className='border text-slate-400 border-slate-400 w-full rounded text-sm p-2 mt-2 focus:outline-none mb-4' value={userName} placeholder='e.g John Doe' readonly/>
        <label>Prompt</label>
        <button className='ml-2 border rounded text-sm bg-[#EcECF1] font-semibold px-2' onClick={randomPrompt}>surprise me</button><br/>
        <input name='text-area' className='border border-slate-400 w-full rounded text-sm p-2 mt-2 focus:outline-none ' placeholder='Surprise Me' value={prompt} onChange={(e)=>setPrompt(e.target.value)} required/>
        <img src={generatingImage ? loader: photo} className="w-80 mt-7 max-w-xs border-2 rounded"/>
        {generatingImage ? <button className='border rounded bg-green-800 py-2 px-4 text-white font-semibold mt-4'disabled >Generating...</button> : <button className='border rounded bg-green-600 py-2 px-4 text-white font-semibold mt-4' onClick={generateImage} >Generate</button>}
        <p className='mt-6 text-slate-600'>** Once you have created the image you want, you can share it with others in the community **</p>
        {sharingImage ? <button className='border rounded bg-blue-800 py-2 px-4 text-white font-semibold mt-2 mb-6' disabled>Sharing...</button>:
        <button type='submit' className='border rounded bg-blue-500 py-2 px-4 text-white font-semibold mt-2 mb-6' onClick={shareImage}>Share with the Community</button>}
      </div>
    </div>
  )
}

export default CreateImage
