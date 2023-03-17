import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = ({setUserName, authErr, setAuthErr}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null)
    const navigate = useNavigate()
    const [loggingIn, setLoggingIn] = useState(false)

    const logIn = async () => {
        const response = await fetch('https://ai-image-backend.netlify.app/.netlify/functions/api/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({email:email, password:password})
        })
        const data = await response.json()
        if(data.user){
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.user.name)
            setErr(null)
            setUserName(data.user.name)
            navigate('/create-image')
        }
        else{
            setErr(data.error)
            setAuthErr(true)
        }
        setLoggingIn(false)
    }
    useEffect(()=>{
        if(authErr){
            setTimeout(() => {
                setAuthErr(false)
            }, 3000);
        }
    }, [authErr])

  return (
    <div className="bg-[#f9fafe] min-h-screen border border-t-slate-200 relative">
        {authErr &&
            <div className='bg-red-500 rounded max-w-60 absolute top-2 right-0'>
                <p className='px-1.5 py-2 text-center text-white font-semibold'>{err}</p>
                <div className='w-full h-1 rounded bg-red-700 animate-progressbar'></div>
            </div>}
        <div className='lg:max-w-2xl max-w-md mx-auto mt-8 lg:mt-32 flex flex-col'>
            <label className='text-xl'>Email </label>
            <input className={`py-1.5 border ${err == 'Email not found' ? 'border-red-600':'border-gray-700'} rounded px-1`} type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label className='text-xl mt-4'>Password </label>
            <input className={`py-1.5 border ${err == 'Password Incorrect' ? 'border-red-600' : 'border-gray-700'} rounded px-1`} type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
            {!loggingIn ? <button className='w-full border rounded bg-purple-600 border-gray-600 mt-6 text-white font-medium py-1 self-center' onClick={()=>{
                setLoggingIn(true);
                logIn()}}>Login</button> : <button className='w-full border rounded bg-purple-800 border-gray-600 mt-6 text-white font-medium py-1 self-center' disabled>Logging In</button>}
        </div>
        <div className='lg:max-w-2xl max-w-md mx-auto mt-8'>
        <p className='inline-block pr-4 text-lg'>Don't have an Account?</p>
        <Link to={"/signup"}>
            <button className='text-purple-600 text-lg border-b-2 border-purple-600 font-semibold'>Signup</button>
        </Link>
        </div>
    </div>
  )
}
