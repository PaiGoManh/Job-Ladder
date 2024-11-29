import { createBrowserRouter,createRoutesFromElements,RouterProvider,Router, Route } from 'react-router-dom'
import './App.css'
import Authlayout from './Layout/Authlayout'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Index from './Components/Index'
import Adminlayout from './Layout/Adminlayout'
import AboutPage from './Pages/AboutPage'
import Employerlayout from './Layout/Employerlayout'
import UserLayout from './Layout/UserLayout'



function App() {
const router=createBrowserRouter(
  createRoutesFromElements(
    <>

    {/* Landing page */}
    <Route path='/' element={<Authlayout/>}>
    <Route index element={<Index/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/about' element={<AboutPage/>}/>
    </Route>

{/* Admin page */}
<Route path='/admin' element={<Adminlayout/>}>

</Route>


{/* Employer page */}

<Route path='/employer' element={<Employerlayout/>}>


</Route>

{/* User Page */}

<Route path='/user' element={<UserLayout/>}>

</Route>




    </>
  )
)


  return (
    <>
    <RouterProvider router={router}/>
   
    </>
  )
}

export default App

