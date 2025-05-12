# Recipe Sharing Platform - Backend
This repository contains the backend for the cloud-based Recipe Sharing Platform. It
offers a RESTful API for user registration, authentication, recipe creation, image
upload to AWS S3, and secure data interaction with a MySQL database hosted on AWS RDS.
## Features
- JWT-based authentication
- User registration and login
- CRUD operations for recipes
- Image uploads via AWS S3 (with IAM role)
- Sequelize ORM for database modeling
- Environment-based configuration
- Dockerized for production deployment on EC2
## Technology Stack
- Node.js with Express.js
- MySQL via AWS RDS
- Sequelize ORM
- JWT + bcrypt
- AWS S3 (IAM-based upload)
- Docker
## Getting Started (Local Development)
### 1. Clone the repository
```bash
git clone https://github.com/your-username/recipe-backend.git
cd recipe-backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Create .env file in root
```env
DB_HOST=your-rds-endpoint.amazonaws.com
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=recipe_platform
DB_PORT=3306
JWT_SECRET=your_jwt_secret
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-s3-bucket-name
```
### 4. Run the application
```bash
npm start
```
## API Endpoints
| Method | Endpoint | Auth Required | Description |
|--------|------------------------|----------------|----------------------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and get JWT token |
| GET | `/api/recipes` | No | Get all public recipes |
| GET | `/api/recipes/me` | Yes | Get user's recipes |
| POST | `/api/recipes` | Yes | Create a recipe with image |
| GET | `/api/recipes/:id` | No | Get recipe by ID |
| DELETE | `/api/recipes/:id` | Yes | Delete user's recipe |
## Deployment Guide (EC2 + Docker)
### Prerequisites
- Ubuntu EC2 instance with Docker installed
- AWS RDS (MySQL) database
- AWS S3 bucket
- IAM role attached to EC2 instance with limited S3 permissions
### Steps
```bash
# SSH into EC2 and clone repo
git clone https://github.com/your-username/recipe-backend.git
cd recipe-backend
# Add .env file with production values
nano .env
# Build Docker image
docker build -t recipe-backend .
# Run container
docker run -d --name recipe-backend --restart=always -p 5000:5000 --env-file
.env recipe-backend
```
Your backend will be available at `http://<ec2-public-ip>:5000`.
## License
MIT
