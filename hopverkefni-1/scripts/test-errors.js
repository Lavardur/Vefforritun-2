import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
let token;

async function testEndpoints() {
  // Login to get token
  console.log('Testing login...');
  const loginResp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'Pass123!' })
  });
  const loginData = await loginResp.json();
  token = loginData.token;
  console.log('Login successful:', loginData.message);

  // Test error cases
  
  // 1. Authentication error
  console.log('\nTesting authentication error...');
  const authError = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Test', content: 'Test' })
  });
  console.log('Status:', authError.status);
  console.log('Response:', await authError.json());

  // 2. Validation error
  console.log('\nTesting validation error...');
  const validationError = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title: '' }) // Missing required field
  });
  console.log('Status:', validationError.status);
  console.log('Response:', await validationError.json());

  // 3. Not found error
  console.log('\nTesting not found error...');
  const notFoundError = await fetch(`${BASE_URL}/posts/99999`, {
    method: 'GET'
  });
  console.log('Status:', notFoundError.status);
  console.log('Response:', await notFoundError.json());

  // 4. Duplicate entry
  console.log('\nTesting duplicate entry...');
  const duplicateResponse = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name: 'Category 1' }) // Existing category
  });
  
  console.log('Status:', duplicateResponse.status);
  console.log('Response:', await duplicateResponse.json());
}

testEndpoints().catch(console.error);