// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Home.css';

// function Home() {
//   return (
//     <div className="home-container">
//       <h1>Welcome to Farming E-Commerce</h1>
//       <div className="home-options">
//         <Link to="/products" className="home-option">
//           Marketplace
//         </Link>
//         <Link to="/plant-disease" className="home-option">
//           Plant Disease Detection (ML Model)
//         </Link>
//         <Link to="/soil-recommendation" className="home-option">
//           Soil Recommendation System (ML Model)
//         </Link>
//         <Link to="/blogs" className="home-option">
//           Farming Blog
//         </Link>
//         <Link to="/crop-prices" className="home-option">
//           Live Crop Prices
//         </Link>
//         <Link to="/contact" className="home-option">
//           Contact Us
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Home;






// import React from 'react';
// import { Link } from 'react-router-dom';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import '../styles/Home.css';

// function Home() {
//   return (
//     <div className="home">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Welcome to <span>Farming E-Commerce</span></h1>
//         <p>Empowering Farmers with Technology and Market Access</p>
//         <Link to="/products" className="cta-btn">Explore Marketplace</Link>
//       </section>

//       {/* Features */}
//       <section className="features">
//         <div className="feature-card">
//           <h3>🌾 Marketplace</h3>
//           <p>Buy and sell farming tools and equipment at fair prices.</p>
//         </div>
//         <div className="feature-card">
//           <h3>📊 Crop Prices</h3>
//           <p>Live updates on crop prices to make informed selling decisions.</p>
//         </div>
//         <div className="feature-card">
//           <h3>🧪 Soil Recommendations</h3>
//           <p>Use AI models to recommend the best crops based on your soil.</p>
//         </div>
//         <div className="feature-card">
//           <h3>🌿 Disease Detection</h3>
//           <p>Upload leaf images and detect diseases using our ML model.</p>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="ml-section">
//         <h2>Smart Farming Starts Here</h2>
//         <p>Try our ML tools to enhance your yield and efficiency.</p>
//         <div className="ml-links">
//           <Link to="/ml/plant-disease" className="ml-btn">Detect Plant Disease</Link>
//           <Link to="/ml/soil-recommendation" className="ml-btn">Soil Crop Advisor</Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import '../styles/Home.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const sampleProducts = [
//   { id: 1, name: "Tractor", price: "₹5,00,000", img: "https://via.placeholder.com/200" },
//   { id: 2, name: "Plough", price: "₹50,000", img: "https://via.placeholder.com/200" },
//   { id: 3, name: "Irrigation Pump", price: "₹15,000", img: "https://via.placeholder.com/200" },
//   { id: 4, name: "Harvesting Blade", price: "₹9,000", img: "https://via.placeholder.com/200" },
// ];

// const sampleTestimonials = [
//   {
//     name: "Ravi Kumar",
//     location: "Madhya Pradesh",
//     text: "FarmShop helped me connect with buyers in minutes. It's revolutionary!",
//   },
//   {
//     name: "Sunita Verma",
//     location: "Punjab",
//     text: "I sold all my extra tools in just 2 days. Great platform!",
//   },
// ];

// const sampleBlogs = [
//   {
//     id: 1,
//     title: "5 Ways to Boost Soil Fertility",
//     date: "July 5, 2025",
//     snippet: "Learn sustainable practices to keep your soil nutrient-rich and productive.",
//   },
//   {
//     id: 2,
//     title: "How AI is Revolutionizing Farming",
//     date: "July 3, 2025",
//     snippet: "Explore how machine learning is transforming Indian agriculture.",
//   },
// ];

// function Home() {
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//     ]
//   };

//   return (
//     <div className="home">
//       {/* Hero */}
//       <section className="hero">
//         <h1>Welcome to <span>Farming E-Commerce</span></h1>
//         <p>Empowering Farmers with Technology and Market Access</p>
//         <Link to="/products" className="cta-btn">Explore Marketplace</Link>
//       </section>

//       {/* 🌟 Product Carousel */}
//       <section className="carousel-section">
//         <h2>🔥 Featured Products</h2>
//         <Slider {...sliderSettings}>
//           {sampleProducts.map(product => (
//             <div className="product-card" key={product.id}>
//               <img src={product.img} alt={product.name} />
//               <h4>{product.name}</h4>
//               <p>{product.price}</p>
//               <Link to="/products" className="small-btn">View</Link>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* ✅ Features */}
//       <section className="features">
//         <div className="feature-card">
//           <h3>🌾 Marketplace</h3>
//           <p>Buy and sell farming tools and equipment at fair prices.</p>
//         </div>
//         <div className="feature-card">
//           <h3>📊 Crop Prices</h3>
//           <p>Live updates on crop prices to make informed selling decisions.</p>
//         </div>
//         <div className="feature-card">
//           <h3>🧪 Soil Recommendations</h3>
//           <p>AI-based crop suggestions for your soil.</p>
//         </div>
//         <div className="feature-card">
//           <h3>🌿 Disease Detection</h3>
//           <p>Upload leaf images to detect plant diseases using ML.</p>
//         </div>
//       </section>

//       {/* 🧠 ML Section */}
//       <section className="ml-section">
//         <h2>Smart Farming Starts Here</h2>
//         <p>Try our ML tools to enhance your yield and efficiency.</p>
//         <div className="ml-links">
//           <Link to="/ml/plant-disease" className="ml-btn">Detect Plant Disease</Link>
//           <Link to="/ml/soil-recommendation" className="ml-btn">Soil Crop Advisor</Link>
//         </div>
//       </section>

//       {/* ❤️ Testimonials */}
//       <section className="testimonials">
//         <h2>What Farmers Are Saying</h2>
//         {sampleTestimonials.map((t, i) => (
//           <div className="testimonial-card" key={i}>
//             <p>“{t.text}”</p>
//             <h4>- {t.name}, {t.location}</h4>
//           </div>
//         ))}
//       </section>

//       {/* 📝 Recent Blogs */}
//       <section className="blogs-preview">
//         <h2>From Our Blog</h2>
//         {sampleBlogs.map(blog => (
//           <div className="blog-card" key={blog.id}>
//             <h4>{blog.title}</h4>
//             <small>{blog.date}</small>
//             <p>{blog.snippet}</p>
//             <Link to="/blogs">Read more →</Link>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }

// export default Home;





























import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '../styles/Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sampleProducts = [
  { id: 1, name: "Rotavator", price: "₹56,000", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTTWty9hg5bdcxS06zeFze4i5yPylgXUXBwcX6KwNzYIiV0EZk3zorRjDprwce4_E__0JDlZyikXakh1R9oXDGr7-GRO3kbg" },
  { id: 2, name: "Plough", price: "₹46,000", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tradeindia.com%2Fproducts%2Fagriculture-mb-plough-c7736358.html&psig=AOvVaw2065no8EadUjnDCc-P80ub&ust=1756635664852000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCICLmPunso8DFQAAAAAdAAAAABAK" },
  { id: 3, name: "Irrigation Pump", price: "₹35,000", img: "https://5.imimg.com/data5/SELLER/Default/2023/1/XT/HG/FV/85493065/500-l-tractor-mounted-sprayer.jpg" },
  { id: 4, name: "Riper Binder", price: "₹9,000", img: "https://5.imimg.com/data5/SELLER/Default/2022/11/JA/IF/DM/65750932/mild-steel-reaper-binder-500x500.jpg" },
];

const sampleTestimonials = [
  {
    name: "Ravi Kumar",
    location: "Madhya Pradesh",
    text: "FarmShop helped me connect with buyers in minutes. It's revolutionary!",
  },
  {
    name: "Rajesh Verma",
    location: "Madhya Pradesh",
    text: "i have purchased plough from here and its best. Great platform!",
  },
];

const sampleBlogs = [
  {
    id: 1,
    title: "5 Ways to Boost Soil Fertility",
    date: "July 5, 2025",
    snippet: "Learn sustainable practices to keep your soil nutrient-rich and productive.",
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Farming",
    date: "July 3, 2025",
    snippet: "Explore how machine learning is transforming Indian agriculture.",
  },
];

function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <div className="home">
      <div className="container">

        {/* Hero */}
        <section className="hero">
          <h1>Welcome to <span>Farming E-Commerce</span></h1>
          <p>Empowering Farmers with Technology and Market Access</p>
          <Link to="/products" className="cta-btn">Explore Marketplace</Link>
        </section>

        {/* Carousel */}
        <section className="carousel-section">
          <h2>🔥 Featured Products</h2>
          <Slider {...sliderSettings}>
            {sampleProducts.map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.img} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <Link to="/products" className="small-btn">View</Link>
              </div>
            ))}
          </Slider>
        </section>

        {/* Features */}
        <section className="features">
          <div className="feature-card">
            <h3>🌾 Marketplace</h3>
            <p>Buy and sell farming tools and equipment at fair prices.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Crop Prices</h3>
            <p>Live updates on crop prices to make informed decisions.</p>
          </div>
          <div className="feature-card">
            <h3>🧪 Soil Recommendations</h3>
            <p>AI-based crop suggestions for your soil.</p>
          </div>
          <div className="feature-card">
            <h3>🌿 Disease Detection</h3>
            <p>Upload leaf images to detect plant diseases using ML.</p>
          </div>
        </section>

        {/* ML Section */}
        <section className="ml-section">
          <h2>Smart Farming Starts Here</h2>
          <p>Try our ML tools to enhance your yield and efficiency.</p>
          <div className="ml-links">
            <Link to="/ml/plant-disease" className="ml-btn">Detect Plant Disease</Link>
            <Link to="/ml/soil-recommendation" className="ml-btn">Soil Crop Advisor</Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2>What Farmers Are Saying</h2>
          <div className="testimonial-wrapper">
            {sampleTestimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <p>“{t.text}”</p>
                <h4>- {t.name}, {t.location}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Preview */}
        <section className="blogs-preview">
          <h2>From Our Blog</h2>
          <div className="blog-list">
            {sampleBlogs.map(blog => (
              <div className="blog-card" key={blog.id}>
                <h4>{blog.title}</h4>
                <small>{blog.date}</small>
                <p>{blog.snippet}</p>
                <Link to="/blogs">Read more →</Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
