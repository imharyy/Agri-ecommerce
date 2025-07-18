import React from 'react';
import { useAuth } from '../context/AuthContext'; // Fixed path

function Account() {
  const { user, role } = useAuth();

  if (!user) {
    return <div className="container">Please log in to view account details.</div>;
  }

  return (
    <div className="account container">
      <h2>Account Details</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {role}</p>
    </div>
  );
}

export default Account;
