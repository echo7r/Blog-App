import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import '../../App.css'

function Layout(){
    return(
        <>
            <main>
                <Navbar/>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;