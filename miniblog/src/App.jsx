import './App.css'

// React tools
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
//mapeia se autentificação do usuario foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication.jsx'

// context
import { AuthProvider } from './context/AuthContext.jsx'

// Pages
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Search from "./pages/Search/Search.jsx";
import EditPost from "./pages/EditPost/EditPost.jsx";
import Post from "./pages/Post/Post.jsx";

// Components
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import CreatePost from './pages/CreatePost/CreatePost.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'


function App() {
   
  
  const [user, setUser] = useState(undefined)
  const authContext = useAuthentication() // ← Pega todo o objeto


  const loadingUser = user === undefined


  useEffect(() => {

    onAuthStateChanged(authContext.auth, (user) => {
      setUser(user)
      
    })

  }, [authContext.auth]);

  if(loadingUser) {
    return <p>Carregando...</p>
  }


  
  return (
    <div className="App">
      {/*Colocar o AuthProvider fora do BrowserRouter garante que o estado de autenticação esteja disponível globalmente, inclusive para componentes de roteamento como NavBar ou Routes. Assim:*/}
      {/*Seu AuthProvider passa logout, createUser, auth, e user para o contexto.*/}      
      <AuthProvider value={{ ...authContext, user}}>
        <BrowserRouter>
        {/* Navibar fica abaixo da abertura BrowserRoutes e fora do container */}
        <NavBar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            {/*Se o usuario esta logado deixa passar para rota em questão se não navega para o login*/}
            <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login"/>}></Route>
            <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />}/>
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/search" element={<Search />} />
            {/*Verificar se o user esta presente se não estiver encaminha para o login, caso contrario caminha para Home "/"*/}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}></Route>
            {/*Verificar se o user esta presente se não estiver encaminha para o Register, caso contrario caminha para Home "/"*/}
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>}></Route>            
            {/*Se o usuario esta logado deixa passar para rota em questão se não navega para o login*/}
            <Route path="/dashboards" element={user ? <Dashboard /> : <Navigate to="/login"/>}></Route>
          </Routes>
        </div>
        {/* Footer fica acima do fechamento BrowserRoutes e fora do container */}
        <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
