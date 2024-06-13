import EditPostForm from '../components/EditPostForm';
import useBlogPosts from '../hooks/useBlogPosts';

function EditPostPage() {
  const { navigate } = useBlogPosts();

  return (
    <div>
      <h1>Edit Post Page</h1>
      <EditPostForm />
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default EditPostPage;
