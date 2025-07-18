# Farming E-Commerce Project Directory Structure

```
farming-ecommerce/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AddBlog.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── AdminOrders.jsx
│   │   ├── Client/
│   │   │   ├── BlogList.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout/
│   │   │   │   ├── Address.jsx
│   │   │   │   ├── Billing.jsx
│   │   │   │   └── Payment.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── CropPrices.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ProductList.jsx
│   │   ├── Common/
│   │   │   ├── ChatBot.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── SearchBar.jsx
│   │   └── ML/
│   │       ├── PlantDisease.jsx
│   │       └── SoilRecommendation.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Account.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Settings.jsx
│   │   ├── Signup.jsx
│   │   └── CropPrices.jsx
│   ├── styles/
│   │   ├── Admin.css
│   │   ├── App.css
│   │   ├── Blog.css
│   │   ├── Cart.css
│   │   ├── ChatBot.css
│   │   ├── Header.css
│   │   ├── ML.css
│   │   └── Product.css
│   ├── App.jsx
│   ├── App.css
│   ├── firebase.js
│   └── main.jsx
├── .gitignore
├── firestore.rules
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── ml-backend/
    ├── app.py
    ├── model.pkl
    └── requirements.txt
