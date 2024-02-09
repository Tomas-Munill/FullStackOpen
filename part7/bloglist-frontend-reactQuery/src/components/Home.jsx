import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";

const Home = ({ blogsQueryResult }) => {
  const blogFormRef = useRef();

  if (blogsQueryResult.isLoading) {
    return <div>loading data...</div>;
  }

  if (blogsQueryResult.isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = blogsQueryResult.data;

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          id="frm-blog"
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <Blogs blogs={blogs} />
    </>
  );
};

export default Home;
