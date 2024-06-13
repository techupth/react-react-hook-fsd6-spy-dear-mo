import { useState, useEffect } from 'react';
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams
} from 'react-router-dom';
import axios from 'axios';

function useBlogPosts() {
  const navigate = useNavigate();

  ///////////////////////// Fetch All Posts /////////////////////////
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getPosts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios('http://localhost:4000/posts');
      setPosts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  ///////////////////////// Fetch a Post by postId /////////////////////////
  const [post, setPost] = useState({});
  const [input, setInput] = useState({
    title: '',
    content: ''
  });

  const params = useParams();

  // const location = useLocation();
  // const pathName = location.pathname;
  const matchView = useMatch('/post/view/:id');
  const matchEdit = useMatch('/post/edit/:id');
  const matchCreate = useMatch('/post/create');

  const getPost = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/posts/${params.id}`
      );
      // console.log('postId', params.id);
      // console.log(result);
      // console.log(result.data);
      // console.log(result.data.data);
      // if (pathName === '/post/view/:id') {
      if (matchView) {
        setPost(result.data.data);
        // } else if (pathName === '/post/edit/:id') {
      } else if (matchEdit) {
        const { title, content } = result.data.data;
        setInput({
          title,
          content
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [params.id]);

  ///////////////////////// Delete a Post by postId /////////////////////////
  const deletePost = async (deleteId) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${deleteId}`);
      const newPosts = posts.filter((item) => item.id !== deleteId);
      setPosts(newPosts);
    } catch (error) {
      alert(error);
    }
  };

  ///////////////////////// Create or Update a Post /////////////////////////
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const createPost = async () => {
    try {
      const { title, content } = input;
      const newPost = {
        title,
        content
      };
      if (matchCreate) {
        await axios.post('http://localhost:4000/posts', newPost);
      } else if (matchEdit) {
        await axios.put(`http://localhost:4000/posts/${params.id}`, newPost);
      }
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return {
    posts,
    isError,
    isLoading,
    navigate,
    post,
    deletePost,
    input,
    handleChangeInput,
    handleSubmit
  };
}

export default useBlogPosts;
