import { Outlet } from "react-router-dom"
import Navbar from "./components/layouts/Navbar"
import Footer from "./components/layouts/Footer"
function App() {

  return (
    <>
     <Navbar />
     <div className="container m-auto min-h-screen">
     <Outlet />
     </div>
     <Footer/>
    </>
  )
}

export default App
