import "./App.css"
import {  Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Single } from "./Pages/Single"
import { HomePage } from "./Pages/HomePage"
import { Write } from "./Pages/Write"
import { Footer } from "./components/Footer"
import { User } from "./Pages/User"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
import { Logout } from "./Pages/Logout"
import { MyPosts } from "./Pages/MyPosts"
import { About } from "./Pages/About"

function App() {

  const user = true ;

  return (
    <>


        <Navbar/>

        <Routes>

          <Route path="/" exact element={user ? <HomePage/> : <Register />} />
          <Route path="/Register"  element={<Register />} />                   
          <Route path="/Write" element={<Write />} />                  
          <Route path="/User" element={<User />} />                   
          <Route path="/MyPosts" element={<MyPosts />} />                   
          <Route path="/About" element={<About />} />                   
          <Route path="/Login" element={<Login />} />                   
          <Route path="/Logout" element={<Logout />} />                   

          <Route path="/post/:postId" element={<Single />} />

        </Routes>

        <Footer/>
        



    </>
  )
}

export default App
