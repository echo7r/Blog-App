import { useState } from "react";
import Pages from "./components/Pages/Pages";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { UserContextProvider } from "./components/UserContext/UserContext";
import CreatePost from "./components/CreatePost/CreatePost";
import PostPage from "./components/PostPage/PostPage";
import EditPost from "./components/EditPost/EditPost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        {/* Here we initialized our default route when the webpage is loaded we also changed the main.jsx */}
        <Routes>
          {/* Route for main page of the website */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Pages />} />

            {/* Route for Login */}
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/post/:id"} element={<PostPage />} />
          </Route>
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
