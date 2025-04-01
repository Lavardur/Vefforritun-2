'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggler() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // On mount, read the theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
