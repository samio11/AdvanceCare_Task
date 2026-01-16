# AdvanceEdu E-Commerce Platform

A robust e-commerce backend system built with Node.js, TypeScript, Express, and MongoDB, featuring integrated SSLCommerz payment gateway and comprehensive user management.

## Features

### Core Functionality
- **Product Management** - Complete CRUD operations for products with stock tracking
- **User Management** - Role-based access control with admin and customer roles
- **Authentication** - Secure login and registration with email verification
- **Payment Integration** - SSLCommerz payment gateway with transaction tracking
- **Query Builder** - Advanced filtering, searching, sorting, and pagination

### Key Capabilities
- Transaction-based payment processing with automatic stock management
- Email notifications for user registration
- File upload support for products and user profiles
- Admin panel for user verification and blocking
- Secure payment callbacks (success, fail, cancel)

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Payment Gateway**: SSLCommerz
- **Authentication**: bcrypt for password hashing
- **File Upload**: Multer
- **Email**: Custom email service integration

## Project Structure

```
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.services.ts
│   │   ├── auth.routes.ts
│   │   └── auth.validation.ts
│   ├── product/
│   │   ├── product.interface.ts
│   │   ├── product.model.ts
│   │   ├── product.services.ts
│   │   ├── product.controller.ts
│   │   ├── product.routes.ts
│   │   └── product.validation.ts
│   ├── payment/
│   │   ├── payment.interface.ts
│   │   ├── payment.model.ts
│   │   ├── payment.services.ts
│   │   ├── payment.controller.ts
│   │   └── payment.routes.ts
│   ├── user/
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.services.ts
│   │   ├── user.controller.ts
│   │   └── user.routes.ts
│   └── sslCommerz/
│       ├── sslCommerz.interface.ts
│       └── sslCommerz.services.ts
├── utils/
│   ├── QueryBuilder.ts
│   ├── generateTransactionId.ts
│   └── sendEmail.ts
├── middlewares/
│   ├── checkAuth.ts
│   ├── parseFormData.ts
│   └── validateRequest.ts
├── errors/
│   └── AppError.ts
└── config/
    └── multer.config.ts
```

## API Endpoints

### Authentication
```http
POST   /api/auth/login          # User login
POST   /api/auth/register       # User registration with email verification
POST   /api/auth/logout         # User logout
```

### Products
```http
POST   /api/products/create-product        # Create product (Admin only)
GET    /api/products                       # Get all products with filtering
GET    /api/products/single/:productId     # Get single product
PUT    /api/products/update/:productId     # Update product (Admin only)
DELETE /api/products/delete/:productId     # Delete product (Admin only)
```

### Users
```http
GET    /api/users                    # Get all users (Admin only)
GET    /api/users/get-single         # Get current user profile
PUT    /api/users/update             # Update user profile
POST   /api/users/block/:userId      # Block user (Admin only)
POST   /api/users/un-block/:userId   # Unblock user (Admin only)
```

### Payments
```http
POST   /api/payment/create     # Initialize payment (Customer only)
POST   /api/payment/success    # Payment success callback
POST   /api/payment/fail       # Payment failure callback
POST   /api/payment/cancel     # Payment cancellation callback
GET    /api/payment            # Get all payments (Admin only)
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd advanceedu-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with required variables
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE=your_mongodb_connection_string

# JWT Configuration
JWT_ACCESS_TOKEN=your_jwt_access_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_TOKEN=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES=30d

# Password Hashing
BCRYPT_SALT=8

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_FROM=your_email@gmail.com
SMTP_PASS=your_app_password

# Cloudinary Configuration
CLUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# SSLCommerz Payment Gateway
SSL_STORE_ID=your_sslcommerz_store_id
SSL_STORE_PASS=your_sslcommerz_store_password
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v3/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

# SSLCommerz Backend Callback URLs
SSL_SUCCESS_BACKEND_URL=http://localhost:5000/api/v1/payment/success
SSL_FAIL_BACKEND_URL=http://localhost:5000/api/v1/payment/fail
SSL_CANCEL_BACKEND_URL=http://localhost:5000/api/v1/payment/cancel

# SSLCommerz Frontend Redirect URLs
SSL_SUCCESS_FRONTEND_URL=http://localhost:3000/payment/success
SSL_FAIL_FRONTEND_URL=http://localhost:3000/payment/fail
SSL_CANCEL_FRONTEND_URL=http://localhost:3000/payment/cancel
```

**Important Security Notes:**
- Never commit the `.env` file to version control
- Add `.env` to your `.gitignore` file
- Use environment-specific values for production
- For Gmail SMTP, use App Passwords instead of your regular password
- Keep all credentials secure and rotate them regularly

4. Run the application
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Features in Detail

### Payment Flow
1. Customer initiates payment with product and quantity
2. System validates product availability and user authentication
3. Stock is decremented within a MongoDB transaction
4. SSLCommerz payment session is created
5. User is redirected to payment gateway
6. Payment status is updated based on callback (success/fail/cancel)
7. Transaction is committed or rolled back accordingly

### Security Features
- Password hashing with bcrypt
- Role-based access control (Admin, Customer)
- JWT token validation middleware
- Transaction-based operations for data consistency
- Input validation with validation schemas

### Query Builder Capabilities
- **Filtering**: Dynamic field-based filtering
- **Search**: Multi-field text search
- **Sorting**: Flexible sorting options
- **Pagination**: Page-based data retrieval
- **Field Selection**: Selective field projection

## User Roles

- **Admin**: Full system access, can manage products, users, and view all payments
- **Customer**: Can purchase products, view own profile, and make payments

## Error Handling

Custom `AppError` class provides consistent error responses across the application with appropriate HTTP status codes and descriptive messages.

## Email Integration

Automated email notifications sent for:
- User registration welcome emails
- Payment confirmations
- Account verification

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact the development team.

---

**Note**: This is a backend API service. A separate frontend application is required for the complete e-commerce experience.
