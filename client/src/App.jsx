import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import CreateImage from './components/CreateImage'
import Home from './components/Home'
import {logo} from './assets/index'
function App() {

  return (
    <BrowserRouter>
      <header className='max-w-7xl pt-2 pb-2 font-medium text-lg flex justify-between w-11/12 mx-auto'>
        <Link to={"/"}><img className='h-7 mt-0.5' src={logo} alt="OpenAI Logo"/></Link>
        <Link to={"/create-image"}>
          <button className='border bg-purple-600 px-3 py-1.5 text-white rounded text-sm'>Create</button>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/create-image' element={<CreateImage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
