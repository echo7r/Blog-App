import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import { formatISO9075 } from "date-fns";
import {UserContext} from '../UserContext/UserContext'
import { Link } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="p-4">
      <div className="aboutpost text-center my-4">
        <div className="image my-3">
          <h1 className="my-3 font-bold text-3xl">{postInfo.title}</h1>
          <time className="my-3 text-[#aaa]">{formatISO9075(new Date(postInfo.createdAt))}</time>
          <div className="author my-3">By @{postInfo.author.Username}
          {userInfo.id===postInfo.author._id && (
            <div className="edit-row my-1">
                <Link className="edit-btn text-green-400" to={`/edit/${postInfo._id}`}>Edit This Post</Link>
            </div>
          )}
          </div>
        </div>
        <img
          src={`http://localhost:3000/${postInfo.cover}`}
          className="h-fit mx-auto w-[80%] object-contain my-2"
          alt=""
        />
        <div className="text p-4 text-start">
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
