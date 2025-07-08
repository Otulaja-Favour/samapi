# Thunder Client Test Guide for User Authentication

## Server Information
- **Base URL**: http://localhost:5000 (or check your server console for the actual port)
- **Content-Type**: application/json

## Test Cases to Run in Thunder Client

### 1. Test User Signup (Valid Password - 6+ characters)
**Method**: POST
**URL**: http://localhost:5000/api/users
**Headers**: 
- Content-Type: application/json

**Body (JSON)**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "phoneNumber": 1234567890,
  "password": "mypass123"
}
```

**Expected Response (201 Created)**:
```json
{
  "id": "user_1641234567890",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "phoneNumber": 1234567890,
  "role": "user",
  "broughtBooks": [],
  "borrowedBooks": [],
  "transactionHistory": [],
  "comments": [],
  "appointments": [],
  "cart": []
}
```

### 2. Test User Login (Same Password)
**Method**: POST
**URL**: http://localhost:5000/api/users/login
**Headers**: 
- Content-Type: application/json

**Body (JSON)**:
```json
{
  "email": "john@test.com",
  "password": "mypass123"
}
```

**Expected Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_1641234567890",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "phoneNumber": 1234567890,
    "role": "user",
    "broughtBooks": [],
    "borrowedBooks": [],
    "transactionHistory": [],
    "comments": [],
    "appointments": [],
    "cart": []
  }
}
```

### 3. Test Password Validation (Too Short - Less than 6 characters)
**Method**: POST
**URL**: http://localhost:5000/api/users
**Headers**: 
- Content-Type: application/json

**Body (JSON)**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@test.com",
  "phoneNumber": 1234567890,
  "password": "12345"
}
```

**Expected Response (400 Bad Request)**:
```json
{
  "message": "Password must be at least 6 characters long"
}
```

### 4. Test Missing Password
**Method**: POST
**URL**: http://localhost:5000/api/users
**Headers**: 
- Content-Type: application/json

**Body (JSON)**:
```json
{
  "firstName": "Bob",
  "lastName": "Wilson",
  "email": "bob@test.com",
  "phoneNumber": 1234567890
}
```

**Expected Response (400 Bad Request)**:
```json
{
  "message": "Password is required"
}
```

### 5. Test Wrong Password Login
**Method**: POST
**URL**: http://localhost:5000/api/users/login
**Headers**: 
- Content-Type: application/json

**Body (JSON)**:
```json
{
  "email": "john@test.com",
  "password": "wrongpass"
}
```

**Expected Response (400 Bad Request)**:
```json
{
  "message": "Invalid credentials"
}
```

### 6. Test Duplicate User Registration
**Method**: POST
**URL**: http://localhost:5000/api/users
**Headers**: 
- Content-Type: application/json

**Body (JSON)**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "phoneNumber": 1234567890,
  "password": "anotherpass123"
}
```

**Expected Response (400 Bad Request)**:
```json
{
  "message": "User already exists"
}
```

## Testing Steps:

1. **Start Your Server**: Run `npm start` or `node index.js` in terminal
2. **Open Thunder Client**: Launch Thunder Client in VS Code
3. **Create New Request**: Click "New Request" 
4. **Run Tests**: Execute each test case above in order
5. **Verify Results**: Check that responses match expected outputs

## What to Look For:

✅ **Success Cases**:
- User signup with valid password (6+ chars) returns 201 status
- User login with same password returns 200 status with JWT token
- Password is NOT visible in response (security)

❌ **Error Cases**:
- Short password (< 6 chars) returns 400 error
- Missing password returns 400 error
- Wrong login password returns 400 error
- Duplicate email returns 400 error

## Key Validations:
- Password must be at least 6 characters long
- Password is hashed and stored securely
- Users can login with their original password
- No password generation by system
