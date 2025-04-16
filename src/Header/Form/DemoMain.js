import React from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Demo from "./Demo"
import Header from './Header1'
import Finalresume from './Finalresume'
// import Header from './Header1'
const DemoMain = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Header/>}/>
                <Route path="/Demo" element={<Demo/>}/>
                <Route path="/Finalresume" element={<Finalresume/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default DemoMain