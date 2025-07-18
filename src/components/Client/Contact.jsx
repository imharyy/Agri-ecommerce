// import React from 'react';

// function Contact() {
//   return (
//     <div className="contact container">
//       <h2>Contact Us</h2>
//       <p>Email: info@farmingco.com</p>
//       <p>Phone: +91 123-456-7890</p>
//       <p>Address: 123 Farming Lane, Agro City, India</p>
//     </div>
//   );
// }

// export default Contact;





import React, { useState } from 'react';
import '../../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);
    alert('Thanks for reaching out!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>📞 +91 9876543210</p>
          <p>📧 support@farmshop.com</p>
          <p>📍 NH752B, Modi, Dist.- Agar Malwa, Madhya Pradesh, India</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Optional: Embedded map */}
      <div className="map-container">
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.4958201885017!2d76.1956431!3d23.99429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3964c5393066b949%3A0x755457137f2ea3a5!2sPatidar%20Agri%20Equipment!5e0!3m2!1sen!2sin!4v1720799400000!5m2!1sen!2sin"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
