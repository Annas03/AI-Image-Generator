import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = ({setUserName}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const logIn = async () => {
        const response = await fetch('http://localhost:5000/.netlify/functions/api/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email, password:password})
        })
        const data = await response.json()
        if(data.user){
            setErr(null)
            setUserName(data.user.name)
            navigate('/create-image')
        }
        else{
            setErr(data.error)
        }
    }

  return (
    <div>
        <label>Email </label>
        <input placeholder='email Address' type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Password </label>
        <input placeholder='Password' type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className='border rounded bg-slate-400 border-gray-600' onClick={logIn}>Login</button>
        {err && <p>{err}</p>}
        <p>If Account Exists then </p>
        <Link to={"/signup"}>
            <button className='border border-gray-600 bg-gray-300 rounded p-1.5'>SignUp</button>
        </Link>
    </div>
  )
}
