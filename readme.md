# Product Service API

A Node.js service that integrates external product data with internal inventory management, providing a unified API for e-commerce product information.

## Features

- Product information aggregation from external API and internal database
- Caching layer with Redis
- Rate limiting protection
- Token-based authentication
- MongoDB integration for internal product data
- RESTful API endpoints
- Graceful shutdown handling
- Health check endpoint

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd product-service
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/products

# Redis Configuration
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600

# External API Configuration
EXTERNAL_API_KEY=your_api_key_here
EXTERNAL_API_BASE_URL=https://api.external-service.com

# Authentication
AUTH_TOKEN=your_secret_auth_token

# Rate Limiting
RATE_LIMIT_WINDOW=900000  # 15 minutes in milliseconds
RATE_LIMIT_MAX=100        # maximum requests per window
```

## API Endpoints

### Authentication

All endpoints require a valid authentication token in the header:

```
Authorization: Bearer your_auth_token
```

### Available Endpoints

#### GET /api/products/:id

Retrieves comprehensive product information.

**Response:**

```json
{
  "id": "123",
  "name": "Product Name",
  "description": "Product Description",
  "manufacturer": "Manufacturer Name",
  "price": 99.99,
  "stock": 100,
  "warehouseLocation": "A1-B2"
}
```

#### GET /api/products

Returns a paginated list of products.

**Query Parameters:**

- page (default: 1)
- limit (default: 10)
- search (optional)

**Response:**

```json
{
  "products": [],
  "page": 1,
  "totalPages": 10,
  "total": 100
}
```

#### POST /api/products/:id/reprice

Updates product price.

**Request Body:**

```json
{
  "price": 99.99
}
```

#### GET /api/health

Returns service health status.

**Response:**

```json
{
  "status": "healthy",
  "uptime": 123456
}
```

## Running the Service

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## Testing

Run the test suite:

```bash
npm test
```

## Project Structure

```
src/
├── config/
│   └── config.js
├── controllers/
│   └── productController.js
├── middleware/
│   ├── auth.js
│   └── rateLimit.js
├── models/
│   └── product.js
├── services/
│   ├── cache.js
│   └── externalApi.js
├── routes/
│   └── index.js
└── index.js
```

## Error Handling

The API uses the following HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error
- 503: Service Unavailable (when external API is down)

## Monitoring and Logging

The service includes:

- Basic health check endpoint
- Uptime monitoring
- Error logging
- Request/Response logging

## Deployment

### Using Docker

1. Build the image:

```bash
docker build -t product-service .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env-file .env product-service
```
