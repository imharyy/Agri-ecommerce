import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin.css';

function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsRef = collection(db, 'blogs');
      const snapshot = await getDocs(blogsRef);
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteDoc(doc(db, 'blogs', blogId));
        setBlogs(prev => prev.filter(blog => blog.id !== blogId));
        alert('Blog deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog');
      }
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/admin/edit-blog/${blogId}`);
  };

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-blogs">
      <div className="blogs-header">
        <h3>Manage Blogs</h3>
        <button 
          onClick={() => navigate('/admin')} 
          className="back-btn"
        >
          ← Back to Dashboard
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs found.</p>
          <button 
            onClick={() => navigate('/admin')} 
            className="btn btn-primary"
          >
            Add Your First Blog
          </button>
        </div>
      ) : (
        <div className="blogs-list">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-header">
                <h4>{blog.title}</h4>
                <div className="blog-actions">
                  <button 
                    onClick={() => handleEdit(blog.id)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="blog-content">
                <p>{blog.content?.substring(0, 200)}...</p>
              </div>
              
              <div className="blog-meta">
                <span>Created: {blog.createdAt?.toLocaleDateString()}</span>
                <span>Category: {blog.category || 'General'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBlogList;