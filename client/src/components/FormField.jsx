import React from 'react'
import { useState } from 'react'

function FormField() {
  const[ImageSearch, setImageSearch] = useState("")
  return (
    <form className='pt-8 w-11/12 mx-auto max-w-7xl'>
      <label>Search posts</label><br/>
      <input name='text-area' className='border border-slate-400 w-full rounded text-sm p-2 mt-2 focus:outline-none text-slate-500' value={ImageSearch} onChange={(e) => setImageSearch(e.target.value)} placeholder='Search Something..'/>
    </form>
  )
}

export default FormField