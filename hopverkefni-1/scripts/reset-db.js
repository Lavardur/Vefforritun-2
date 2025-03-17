import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

console.log('Resetting the database...');

try {
  // Drop the database schema and recreate it
  execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
  
  // Seed the database
  execSync('npm run seed', { stdio: 'inherit' });
  
  console.log('Database has been reset and seeded successfully!');
} catch (error) {
  console.error('Error resetting the database:', error);
  process.exit(1);
}