import React, { useEffect } from "react";
import Editor from "../Editor/Editor";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set('id', id)
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:3000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost} className="p-5">
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
      <input
        className="m-5"
        type="file"
        name=""
        id=""
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <Editor onChange={setContent} value={content} />
      <button className="m-5 bg-green-500 p-4 text-white rounded-xl">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
