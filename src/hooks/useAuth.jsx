import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // En desarrollo, permitir login mock para demostración
      if (import.meta.env.DEV && username === 'contador' && password === 'demosle.cl') {
        console.log('🎭 Login mock exitoso para demostración');
        const mockToken = 'mock-jwt-token-for-development';
        setToken(mockToken);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', mockToken);
        return { success: true };
      }

      // En producción o si no son las credenciales mock, usar API real
      const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
      const response = await fetch(`${baseUrl}/admin-login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      // En desarrollo, como fallback permitir las credenciales por defecto
      if (import.meta.env.DEV && username === 'contador' && password === 'demosle.cl') {
        console.log('🎭 Login fallback exitoso para demostración');
        const mockToken = 'mock-jwt-token-for-development';
        setToken(mockToken);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', mockToken);
        return { success: true };
      }
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
  };

  const value = {
    isAuthenticated,
    token,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};