import React from "react";
import Post from "../post/Post";
import {useState, useEffect} from 'react'

export default function Pages() {
  const [posts, setPosts] = useState([])

  //to render posts from the database
  useEffect(() => {
    fetch("http://localhost:3000/post").then((response) => {
      response.json().then(posts=>{
        setPosts(posts)
      })
    });
  }, []);

  return (
    <>
      {posts.length>0 && posts.map(post=>(
        <Post {...post}/>
      ))}
    </>
  );
}
