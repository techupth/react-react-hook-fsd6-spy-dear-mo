import CreatePostForm from '../components/CreatePostForm';
import useBlogPosts from '../hooks/useBlogPosts';

function CreatePostPage() {
  const { navigate } = useBlogPosts();

  return (
    <div>
      <h1>Create Post Page</h1>
      <CreatePostForm />
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default CreatePostPage;
