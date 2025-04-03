'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggler() {
  // Initialize from the current document theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

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
