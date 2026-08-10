import React, {useContext, useState} from "react";
import {Navigate} from 'react-router-dom'
import '../../App.css'
import { UserContext } from "../UserContext/UserContext";

const Login = () => {
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({Username, Password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });
    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
    }
    else{
      alert('wrong credentials')
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <>
      <form className="logform w-[400px] h-[400px] my-auto flex flex-col mx-auto p-5 bg-[#cfebcf]" onSubmit={login}>
        <h1 className="font-bold text-2xl mb-5 text-center">Login Here</h1>
        <p>UserName</p>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          className="w-[100%] mt-4 mb-4 rounded-md p-2"
          value={Username}
          onChange={ev=>{setUsername(ev.target.value)}}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="w-[100%] mt-4 mb-4 rounded-md p-2"
          value={Password}
          onChange={ev=>{setPassword(ev.target.value)}}
        />
        <button className="mt-4 bg-green-500 w-2/5 mx-auto p-2 rounded-md">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
