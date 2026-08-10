import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { UserContext } from "../UserContext/UserContext";

const Navbar = () => {
  const {setUserInfo, userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        console.log(`userinfo ${userInfo}`)
        setUserInfo(userInfo)
      });
    });
  }, []);

  function logout(){
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null)
  }

  const username = userInfo?.Username

  return (
    <header className="mb-6 p-4">
      <div className="flex justify-between">
        <Link to="/" className="font-bold">
          MyBlog
        </Link>
        <div className="flex gap-4">
          {username && (
            <>
            <span>Hello, {username}</span>
              <Link to="/create">Create New Post</Link>
              <a onClick={logout} className="cursor-pointer">Logout</a>
              {console.log(username)}
            </>
          )}

          {!username && (
            <>
              {/* We use link so that on wondering in our pages the browser should not restart / rerender / refresh*/}
              <Link to="/login" className="cursor-pointer">
                Login
              </Link>
              <Link to="/register" className="cursor-pointer">
                Register
              </Link>
              {console.log(username)}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
