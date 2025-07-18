import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../../styles/Admin.css';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogRef = doc(db, 'blogs', id);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          const data = blogSnap.data();
          setBlog({
            title: data.title || '',
            content: data.content || '',
            category: data.category || ''
          });
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!blog.title.trim() || !blog.content.trim()) {
      alert('Title and content are required');
      return;
    }
    try {
      setSaving(true);
      const blogRef = doc(db, 'blogs', id);
      await updateDoc(blogRef, {
        title: blog.title,
        content: blog.content,
        category: blog.category
      });
      alert('Blog updated successfully');
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert('Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading blog...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="edit-blog">
      <h3>Edit Blog</h3>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={blog.title}
          onChange={handleChange}
          disabled={saving}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={blog.category}
          onChange={handleChange}
          disabled={saving}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={blog.content}
          onChange={handleChange}
          rows={10}
          disabled={saving}
        />
      </div>
      <button onClick={handleSave} disabled={saving} className="btn btn-primary">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      <button onClick={() => navigate('/admin/blogs')} disabled={saving} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </div>
  );
}

export default EditBlog;
