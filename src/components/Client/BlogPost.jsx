// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import '../../styles/Blog.css';

// function BlogPost() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const blogRef = doc(db, 'blogs', id);
//       const docSnap = await getDoc(blogRef);
//       if (docSnap.exists()) {
//         setBlog({ id: docSnap.id, ...docSnap.data() });
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (!blog) {
//     return <div className="container">Loading...</div>;
//   }

//   return (
//     <div className="blog-post container">
//       <h2>{blog.title}</h2>
//       <p>{blog.content}</p>
//     </div>
//   );
// }

// export default BlogPost;













import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/Blog.css';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate('/notfound');
      }
    };
    fetchBlog();
  }, [id, navigate]);

  if (!blog) return <div className="blog-post-page">Loading...</div>;

  return (
    <div className="blog-post-page">
      <img className="blog-banner" src={blog.imageUrl || '/placeholder.png'} alt={blog.title} />
      <div className="blog-content">
        <h1>{blog.title}</h1>
        <p className="meta">🗓️ {blog.date} &nbsp; | ✍️ {blog.author || 'Admin'}</p>
        <div className="text">{blog.content}</div>
      </div>
    </div>
  );
}

export default BlogPost;
