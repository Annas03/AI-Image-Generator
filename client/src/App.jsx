import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import CreateImage from './components/CreateImage'
import Home from './components/Home'
import Signup from './components/Signup'
import {logo} from './assets/index'
import { useEffect, useState } from 'react'
import { Login } from './components/Login'
import { Button, Dropdown, Space } from 'antd';



function App() {
  
  const [images, setImages] = useState(16)
  const [userName, setUserName] = useState(localStorage.getItem('name'))
  const [loggedIn, setLoggedIn] = useState(false)
  const [authErr, setAuthErr] = useState(false)
  
  const Logout = ()=>{
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    setUserName(null)
    location.href = "https://ai-image-generator-2.netlify.app"
    // location.href = "http://localhost:5173"
  }
  
  const items = [
    {
      key: '1',
      label: (
        <button onClick={Logout}>
          LogOut
        </button>
      ),
    }
  ];
  
  useEffect(()=>{
    setLoggedIn(false)
  }, [])

  return (
    <BrowserRouter>
      <header className='max-w-7xl pt-2 pb-2 font-medium text-lg flex justify-between w-11/12 mx-auto'>
        <Link to={"/"}><img className='h-7 mt-0.5' src={logo} alt="OpenAI Logo"/></Link>
        <div className='flex'>
          {userName == null ? <Link to={"/login"}>
          <button className='border bg-purple-600 px-3 py-1.5 text-white rounded text-sm'>Create</button>
          </Link>:<Link to={"/create-image"}>
            <button className='border bg-purple-600 px-3 py-1.5 text-white rounded text-sm'>Create</button>
          </Link>}
          {userName != null && 
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                >
                  <Button>{userName}</Button>
                </Dropdown>
              </Space>
            </Space>}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home images={images} setImages={setImages} userName={userName}/>}/>
        <Route path='/create-image' element={<CreateImage userName={userName} setImages={setImages} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
        <Route path='/signup' element={<Signup setUserName={setUserName} setAuthErr={setAuthErr} authErr={authErr}/>}/>
        <Route path='/login' element={<Login setUserName={setUserName} setAuthErr={setAuthErr} authErr={authErr}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
