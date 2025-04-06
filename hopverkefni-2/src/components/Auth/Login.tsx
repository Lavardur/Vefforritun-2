'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, authState } = useAuth();
  const router = useRouter();

  // Handle redirect in useEffect instead of during render
  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push('/');
    }
  }, [authState.isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = await login({ username, password });
    if (!success) {
      setError('Invalid username or password');
    }
    // Note: We don't need to navigate here anymore as the useEffect will handle it
  };

  // Remove conditional rendering that caused the redirect during render
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log In</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={authState.isLoading}
        >
          {authState.isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;