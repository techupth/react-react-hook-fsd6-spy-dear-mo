// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
import useBlogPosts from '../hooks/useBlogPosts';

function ViewPostPage() {
  // const navigate = useNavigate();

  // const [posts, setPosts] = useState([]);
  // const [isError, setIsError] = useState(null);
  // const [isLoading, setIsLoading] = useState(null);

  // const getPosts = async () => {
  //   try {
  //     setIsError(false);
  //     setIsLoading(true);
  //     const results = await axios("http://localhost:4000/posts");
  //     setPosts(results.data.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsError(true);
  //   }
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);

  const { posts, isError, isLoading, navigate, post } = useBlogPosts();

  return (
    <div>
      <h1>View Post Page</h1>
      <div className="view-post-container">
        {/* <h2>Post Title</h2> */}
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>

      <hr />
      <div className="show-all-posts-container">
        <h2>All Posts</h2>
        {posts.map((post) => {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={() => navigate(`/post/view/${post.id}`)}
                >
                  View post
                </button>
              </div>
            </div>
          );
        })}
        {isError ? <h1>Request failed</h1> : null}
        {isLoading ? <h1>Loading ....</h1> : null}
      </div>

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default ViewPostPage;
