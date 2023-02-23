import React,{useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({setUserName}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const signIn = async () => {
        const response = await fetch('http://localhost:5000/.netlify/functions/api/signup', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email: email, password:password, name:name})
        })
        const data = await response.json()
        if(data.user){
            setUserName(data.user.name)
            setErr(null)
            navigate('/create-image')
        }
        else{
            setErr(data.error)
        }
    }
  return (
    <div>
        <label>Name </label>
        <input placeholder='Name' type={'text'} value={name} onChange={(e)=>setName(e.target.value)} />
        <label>Email </label>
        <input placeholder='email Address' type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Password </label>
        <input placeholder='Password' type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className='border rounded bg-slate-400 border-gray-600' onClick={signIn}>Signup</button>
        {err && <p>{err}</p>}
    </div>
  )
}

export default Signup