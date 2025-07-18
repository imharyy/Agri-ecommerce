// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { db } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import '../../styles/Blog.css';

// function BlogList() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const blogsRef = collection(db, 'blogs');
//       const snapshot = await getDocs(blogsRef);
//       const blogsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setBlogs(blogsData);
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="blog-list container">
//       <h2>Farming Techniques Blog</h2>
//       <div className="blog-grid">
//         {blogs.map((blog) => (
//           <div key={blog.id} className="blog-item">
//             <h3>{blog.title}</h3>
//             <p>{blog.content.substring(0, 100)}...</p>
//             <Link to={`/blog/${blog.id}`}>Read More</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BlogList;







import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/Blog.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogList);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-page">
      <h2>Our Latest Blogs</h2>
      <div className="blog-grid">
        {blogs.map(blog => (
          <Link to={`/blogs/${blog.id}`} className="blog-card" key={blog.id}>
            <img src={blog.imageUrl || '/placeholder.png'} alt={blog.title} />
            <div className="blog-info">
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <span>Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
