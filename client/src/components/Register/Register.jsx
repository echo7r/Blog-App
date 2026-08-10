import React, { useState } from 'react'
import '../../App.css'

const Register = () => {
  const [Username, setUsername] = useState('')
  const [Password,setPassword] = useState('')
  
  //sending data to our backend
  async function register(ev){
    ev.preventDefault() //prevents default behaviour bcoz on clicking register the page will refresh due to default behaviour of form
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({Username,Password}), //sending username and password at backend
      headers: {'Content-Type': 'application/json'}
    })
    if(response.status===200){
      alert('Registration Successful')
    }else{
      alert('Registration Failed')      
    }
  }

  return (
    <form className="regform w-[400px] h-[400px] my-auto flex flex-col mx-auto p-5 bg-[#cfebcf]" onSubmit={register}>
        <h1 className="font-bold text-2xl mb-5 text-center">Register With Us</h1>
        <p>UserName</p>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          className="w-[100%] mt-4 mb-4 rounded-md p-2"
          value={Username}
          onChange={ev=>setUsername(ev.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="w-[100%] mt-4 mb-4 rounded-md p-2"
          value={Password}
          onChange={ev=>setPassword(ev.target.value)}
        />
        <button className="mt-4 bg-green-500 w-2/5 mx-auto p-2 rounded-md">
          Register
        </button>
      </form>
  )
}

export default Register
