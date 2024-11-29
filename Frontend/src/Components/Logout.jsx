import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate=useNavigate()
    const logoutladder = async () => {
        try {
          const res = await fetch('/api/auth/logout', { method: 'GET' });
          if (res.ok) {
            console.log('Logout success');
            navigate('/');
          } else {
            console.log('Logout failed');
          }
        } catch (error) {
          console.log('Something went wrong');
          console.error('Something went wrong:', error);
        }
      };

  return (
    <div>
        <button onClick={logoutladder} className="w-full bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded-lg">
            Logout
          </button>
    </div>
  )
}

export default Logout