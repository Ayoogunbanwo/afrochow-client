// withAuth.js (HOC)
import React, { useState, useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Check the authentication status (you might check token or user info from context/localStorage)
      const token = localStorage.getItem('auth');
      if (token) {
        // Fetch user data from an API or context
        fetchUserData();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);

    const fetchUserData = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify({
            email: auth.email,
            access_token: auth.accessToken,
            refresh_token: auth.refreshToken,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          throw new Error('User data fetch failed');
        }
      } catch (error) {
        console.error(error);
      }
    };

    return <WrappedComponent {...props} user={user} isAuthenticated={isAuthenticated} />;
  };
};

export default withAuth;
