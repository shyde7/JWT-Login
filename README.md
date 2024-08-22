# JWT Authentication Sample Project

This project is a simple implementation of user authentication using JWT (JSON Web Tokens). It includes basic functionalities for user registration and login with password hashing and data storage in MongoDB. This project demonstrates the use of modern web technologies to provide secure user authentication.

## Features

- User registration with email and password
- Password hashing using bcrypt
- User login with JWT authentication
- MongoDB integration for user data storage
- Responsive and modern UI design

## Usage

1. Start the server using Nodemon:
    ```bash
    nodemon server.js
    ```

2. Open your browser and navigate to `http://localhost:3019`.

3. Use the signup form to create a new user and the login form to authenticate.

   Alternatively try it out here: ## Link to Github Page

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

## Notes

- This project is a simple demonstration of JWT authentication and is not a complete application.
- Proper error handling and validation should be added for production use.
- Ensure your JWT secret is kept safe and not exposed in a public repository.

## License

This project is open source and available under the [MIT License](LICENSE).
