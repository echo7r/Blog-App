import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import '../../App.css'

function Layout(){
    return(
        <>
            <main>
                <Navbar/>
                <div className="h-full w-full">
                    <Outlet/>
                </div>
            </main>
        </>
    )
}

export default Layout;