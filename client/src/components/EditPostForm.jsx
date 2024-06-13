import useBlogPosts from '../hooks/useBlogPosts';

function EditPostForm() {
  const { input, handleChangeInput, handleSubmit } = useBlogPosts();

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Edit Post Form</h1>
      <div className="input-container">
        <label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={handleChangeInput}
            value={input.title}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Content
          <textarea
            id="content"
            name="content"
            type="text"
            placeholder="Enter content here"
            onChange={handleChangeInput}
            value={input.content}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditPostForm;
