import React from "react";
import "../../App.css";
import { formatISO9075 } from "date-fns";
import {Link} from 'react-router-dom'

function Post({_id, title, summary, content, cover, createdAt, author }) {
  return (
    <>
      <div className="post flex justify-evenly mt-4 mb-4 gap-3 p-3" key={_id}>
        {/* Image */}
        <div className="img w-[50%]">
          <Link to={`/post/${_id}`}>
            <img
              src={"http://localhost:3000/" + cover}
              className="object-contain mx-auto h-[50%] w-[fit] flex items-center"
              alt=""
            />
          </Link>
        </div>
        {/* Heading */}
        <div className="text min-w-[35%]">
          <Link to={`/post/${_id}`}>
            <h2 className="font-bold mt-4 text-xl">{title}</h2>

            <p>{content}</p>
          </Link>
          {/* Author and Time */}
          <p className="info mt-4 flex gap-2 items-center">
            <a className="author">{author.Username}</a>
            <time className="text-gray-600">
              {formatISO9075(new Date(createdAt))}
            </time>
          </p>
          {/* Summary of Image */}
          <p className="mt-4 text-md text-gray-600">{summary}</p>
        </div>
      </div>
      {/* A Line */}
      <div className="line border-b-[1px] m-2"></div>
    </>
  );
}

export default Post;
