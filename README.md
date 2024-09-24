# JWT Authentication Sample Project

This project is a simple implementation of user authentication using JWT (JSON Web Tokens). It includes basic functionalities for user registration and login with password hashing and data storage in MongoDB. This project demonstrates the use of modern web technologies to provide secure user authentication.

## Features

- User registration with email and password
- Password hashing using bcrypt
- User login with JWT authentication
- MongoDB integration for user data storage
- Responsive and modern UI design

## Usage

1. Use the signup form to create a new user and the login form to authenticate.
2. Check your email for a verification link.
3. Click the link and your account will then be verified!
4. Try signing in with the username and password you signed up with.


## Endpoints

- `POST /post`: Register a new user
    - Request body: `{ "email": "user@example.com", "password": "password123" }`

- `POST /login`: Authenticate an existing user
    - Request body: `{ "email": "user@example.com", "password": "password123" }`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- bcrypt.js
- JSON Web Tokens (JWT)
- HTML, CSS, JavaScript

