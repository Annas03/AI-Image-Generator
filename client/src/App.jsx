import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import CreateImage from './components/CreateImage'
import Home from './components/Home'
import Signup from './components/Signup'
import {logo} from './assets/index'
import { useRef, useState } from 'react'
import { Login } from './components/Login'
// import jwt from 'jsonwebtoken'

function App() {

  const [images, setImages] = useState(16)
  // const AuthToken = useRef(0)
  // const [isSigned, setIsSigned] = useState(false)
  const [userName, setUserName] = useState(null)

  // useEffect(()=>{
  //     jwt.verify(localStorage.getItem('token'), process.env.SECRET_TOKEN_KEY, (err, user)=> {
  //       if(err){
  //         AuthToken.current = 'Not Authorized'
  //         setIsSigned(false)
  //       }
  //       else{
  //         AuthToken.current = 'Authorized'
  //         setIsSigned(true)
  //       }
  //   })
  // }, [])

  const signIn = async () => {
    const resp = await fetch('https://ai-image-backend.netlify.app/.netlify/functions/api/auth/signin')
    const data = await resp.json()
    localStorage.setItem('token', data.token)
  }

  return (
    <BrowserRouter>
      <header className='max-w-7xl pt-2 pb-2 font-medium text-lg flex justify-between w-11/12 mx-auto'>
        <Link to={"/"}><img className='h-7 mt-0.5' src={logo} alt="OpenAI Logo"/></Link>
        <div>
          {userName == null ? <Link to={"/login"}>
          <button className='border bg-purple-600 px-3 py-1.5 text-white rounded text-sm'>Create</button>
          </Link>:<Link to={"/create-image"}>
            <button className='border bg-purple-600 px-3 py-1.5 text-white rounded text-sm'>Create</button>
          </Link>}
          {userName == "" && <p>{userName}</p>}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home images={images} setImages={setImages}/>}/>
        <Route path='/create-image' element={<CreateImage userName={userName} setImages={setImages}/>}/>
        <Route path='/signup' element={<Signup setUserName={setUserName}/>}/>
        <Route path='/login' element={<Login setUserName={setUserName}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
