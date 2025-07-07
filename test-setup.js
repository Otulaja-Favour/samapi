// Test script to verify the book library backend setup
const path = require('path');
const fs = require('fs');

console.log('=== Book Library Backend Test ===');

// Check if all required files exist
const requiredFiles = [
  'server.js',
  'package.json',
  'controllers/bookController.js',
  'routes/books.js',
  'middleware/upload.js',
  'models/Book.js',
  'config/database.js',
  'uploads/.gitkeep'
];

console.log('\n1. Checking required files:');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} missing`);
  }
});

// Check if node_modules exists
console.log('\n2. Checking dependencies:');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✓ node_modules exists');
} else {
  console.log('✗ node_modules missing - run npm install');
}

// Check package.json for required dependencies
console.log('\n3. Checking package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const requiredDeps = ['express', 'mongoose', 'multer', 'cors', 'dotenv'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✓ ${dep} is installed`);
    } else {
      console.log(`✗ ${dep} is missing`);
    }
  });
} catch (error) {
  console.log('✗ Error reading package.json:', error.message);
}

// Check .env file
console.log('\n4. Checking environment configuration:');
if (fs.existsSync(path.join(__dirname, '.env'))) {
  console.log('✓ .env file exists');
  try {
    const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    if (envContent.includes('MONGODB_URI')) {
      console.log('✓ MONGODB_URI is configured');
    } else {
      console.log('✗ MONGODB_URI is missing');
    }
  } catch (error) {
    console.log('✗ Error reading .env file:', error.message);
  }
} else {
  console.log('✗ .env file missing');
}

// Check uploads directory
console.log('\n5. Checking uploads directory:');
const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  console.log('✓ uploads directory exists');
  const files = fs.readdirSync(uploadsDir);
  console.log(`  Files in uploads: ${files.length > 0 ? files.join(', ') : 'none'}`);
} else {
  console.log('✗ uploads directory missing');
}

console.log('\n=== Test Complete ===');
console.log('\nTo start the server, run: node server.js');
console.log('To test file upload, open test-upload.html in a browser');
