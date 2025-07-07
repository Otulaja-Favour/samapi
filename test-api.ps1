# PowerShell script to test the book library API endpoints
Write-Host "=== Book Library API Test ===" -ForegroundColor Green

# Test 1: Health check
Write-Host "`n1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
    Write-Host "✓ Health check successful" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 2)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Get all books
Write-Host "`n2. Testing get all books..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/books" -Method Get
    Write-Host "✓ Get books successful" -ForegroundColor Green
    Write-Host "Found $($response.Count) books" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Get books failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Create a book without file upload
Write-Host "`n3. Testing create book (URL only)..." -ForegroundColor Yellow
$bookData = @{
    title = "Test Book"
    author = "Test Author"
    description = "A test book for API testing"
    price = 19.99
    rent = 5.99
    image = "https://via.placeholder.com/300x400"
    pdfUrl = "https://example.com/test.pdf"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/books" -Method Post -Body $bookData -ContentType "application/json"
    Write-Host "✓ Create book successful" -ForegroundColor Green
    Write-Host "Created book ID: $($response._id)" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Create book failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Green
Write-Host "For file upload testing, use test-upload.html or a tool like Postman" -ForegroundColor Cyan
