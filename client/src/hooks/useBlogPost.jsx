import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useblogPost() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getPosts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:4000/posts");
      setPosts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return {
    posts,
    isError,
    isLoading,
    navigate,
  };
}

export default useblogPost;
