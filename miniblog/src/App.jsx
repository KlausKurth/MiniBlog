import './App.css'

// React tools
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


// Pages
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'

// Components
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'


function App() {  
  return (
    <div className="App">      
      <BrowserRouter>
      {/* Navibar fica abaixo da abertura BrowserRoutes e fora do container */}
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
      {/* Footer fica acima do fechamento BrowserRoutes e fora do container */}
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
