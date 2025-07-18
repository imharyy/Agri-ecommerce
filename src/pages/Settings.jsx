import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'; // Fixed path

function Settings() {
  const authContext = useAuth();
  const user = authContext?.user; // Safely access user to avoid destructuring errors
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!user) {
    return <div className="container">Please log in to access settings.</div>;
  }

  return (
    <div className="settings container">
      <h2>Settings</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;