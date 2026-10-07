import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import {Navigate} from 'react-router-dom'
import Editor from "../Editor/Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false)

    async function createNewPost(ev){
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files.length != 0 && files[0])
        ev.preventDefault()
        const response = await fetch('http://localhost:3000/post',{
          method: 'POST',
          body: data,
          credentials: "include"
        })
        if(response.ok){
          //if the response is ok which means the post's data has been added to the database
          setRedirect(true)
        }
    }

    //after checking if the response is true we will redirect user to the page
    if(redirect){
      return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={createNewPost} className="p-5">
      <input
        className="w-[90%] m-5 border-2 p-2"
        type="title"
        placeholder={"Enter Title Here"}
        value={title}
        onChange={(ev) => {
          setTitle(ev.target.value);
        }}
      />
      <input
        className="w-[90%] m-5 border-2 p-2"
        type="summary"
        placeholder={"Enter Summary of Post Here"}
        value={summary}
        onChange={(ev) => {
          setSummary(ev.target.value);
        }}
      />
      <input className="m-5" type="file" name="" id="" onChange={ev=>setFiles(ev.target.files)}/>
      <Editor value={content} onChange={setContent} />
      <button className="m-5 bg-green-500 p-4 text-white rounded-xl">
        Create Post
      </button>
    </form>
  );
}
