# binance-microservice Project

This project is an binance microservice application that allows users to receive current exchange rates of coins in real time. The application is built using React + TypeScript, Node.js + Typescript, Express, PostgreSQL, Redis and Docker.

## Table of Contents

- [Instructions to Run the Application]
- [Design Choices and Libraries/Frameworks]

## Instructions to Run the Application locally

To run the binance-microservice application locally, follow these steps:

1. **Clone the Repository:**
   git clone <repository_url>
   cd binance-microservice

2. **Install Dependencies:**
   Navigate to the client and server directories and install the necessary dependencies.

   cd client
   npm install

   cd ../server
   npm install

3. **Set Up MongoDB:**
   Make sure you have a PostgreSQL and Redis instances running.

4. **Run the Application:**
   Start the client and server applications.

   # Start the client (React app)

   cd client
   npm start

   # Start the server (Node.js server)

   cd ../server
   npm trart

5. **Access the Application:**
   Open your browser and navigate to the localhost address to access the binance-microservice application.

## Instructions to Run the Application in docker

To run the binance-microservice application in docker, follow these steps:

1. **Clone the Repository:**
   git clone <repository_url>
   cd binance-microservice

2. **Run the Application:**
   Navigate to the root directory (binance-microservice)

   # Start the service

   docker-compose up --build

This will build the Docker images and start the containers for both the client (React TypeScript) and server (Node.js, Express, PostgreSQL, Redis). The React app will be accessible at http://localhost:3000, and the Node.js server will be accessible at http://localhost:5000.

Make sure to adjust the configurations (e.g., ports, environment variables) in the Dockerfile and docker-compose.yml according to your specific application's requirements.

## Design Choices and Libraries/Frameworks

### Frontend (Client)

- **React:** Chosen for its component-based architecture and efficient rendering, making it ideal for building interactive user interfaces.
- **TypeScript:** Used to add static typing and improve code maintainability and reliability.

### Backend (Server)

- **Node.js:** Selected for its asynchronous and event-driven nature, making it suitable for building scalable and performant server applications.
- **Express:** Utilized as the web application framework for handling HTTP requests, routing, and middleware integration.
- **PostreSQL:** Chosen as the database to store user information and file metadata.
- **sequelize:** Employed for modeling and interacting with the PostreSQL database.
- **Redis:** Chosen as the database for caching.
- **ws:** ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.
- **redlock:** a node.js implementation of the redlock algorithm for distributed redis locks.
- **dotenv:** Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

This application is about creating a binance-microservice application, inspired by the functionality of the popular Binance platform. Tasks include development of server and client code, database design and integration with external APIs for price monitoring.

The application follows a client-server architecture. The client is responsible for the user interface and interacting with the user, while the server handles integration with external API. PostgreSQL was chosen for its robust features, extensibility, and strong emphasis on standards compliance. Redis is a popular and powerful open-source, in-memory data structure store used for caching. Websockets are a valuable technology in web development because they enable real-time communication. The use of TypeScript improves code quality and provides a more robust development experience. Integration of various libraries and frameworks enhances the functionality and user experience of the binance-microservice application.
