import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../../styles/Admin.css';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        createdAt: new Date(),
      });
      setTitle('');
      setContent('');
      alert('Blog added successfully!');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="admin-section">
      <h3>Add Blog Post</h3>
      <form onSubmit={handleAddBlog}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
          required
        ></textarea>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;