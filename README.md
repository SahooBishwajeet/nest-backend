
# **Nest**

This is the backend application for Nest, a course and user management system, built using **Node.js**, **Express.js**, and **MongoDB**.

---

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

---

## **Features**

- User management with detailed profiles and role-based data.
- Course management with parent topics, content, and progress tracking.
- Notes management for user-specific annotations on course contents.
- Dynamic progress tracking and content status updates.
- MongoDB for persistent data storage.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Minimalist web framework for routing and middleware.
- **MongoDB**: NoSQL database for storing user, course, and progress data.
- **Mongoose**: MongoDB object modeling for schema validation and data management.
- **TypeScript**: Strongly typed JavaScript for enhanced developer experience.

---

## **Getting Started**

Follow these steps to set up and run the project locally:

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd <repository-name>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root of the project and add the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
```

### **4. Start the Development Server**

```bash
npm run dev
```

The server will run at [http://localhost:5000](http://localhost:5000).

---

## **Project Structure**

```
.
├── src/
│   ├── controllers/         # API request handlers
│   │   ├── user.controller.ts
│   │   ├── course.controller.ts
│   │   ├── userCourse.controller.ts
│   ├── models/              # Mongoose schemas and models
│   │   ├── user.model.ts
│   │   ├── course.model.ts
│   │   ├── userCourse.model.ts
│   ├── routes/              # API routes
│   │   ├── user.routes.ts
│   │   ├── course.routes.ts
│   │   ├── userCourse.routes.ts
│   ├── config/              # Configuration files
│   │   ├── db.ts            # MongoDB connection
│   ├── utils/               # Utility functions
│   ├── app.ts               # Express app setup
│   ├── server.ts            # Server entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
```

---

## **Environment Variables**

| Variable Name  | Description                      | Example Value                |
|----------------|----------------------------------|------------------------------|
| `PORT`         | Port on which the server runs    | `5000`                     |
| `MONGO_URI`    | MongoDB connection string        | `mongodb://localhost:27017/` |

---

## **Scripts**

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Starts the development server using Nodemon. |
| `npm run build` | Compiles TypeScript into JavaScript.    |
| `npm start`     | Starts the production server.           |

---

## **API Endpoints**

### **User Routes**

| Method | Endpoint                   | Description             |
|--------|----------------------------|-------------------------|
| POST   | `/api/users`              | Create a new user.      |
| GET    | `/api/users`              | Get all users.          |

### **Course Routes**

| Method | Endpoint                               | Description                        |
|--------|----------------------------------------|------------------------------------|
| POST   | `/api/courses`                        | Create a new course.              |
| GET    | `/api/courses`                        | Get all courses.                  |
| GET    | `/api/courses/:courseId`              | Get a specific course by ID.      |
| POST   | `/api/courses/:courseId/add-parent-topic` | Add a parent topic to a course.   |
| POST   | `/api/courses/:courseId/:parentTopicId/add-content` | Add content to a parent topic. |

### **User-Course Routes**

| Method | Endpoint                                          | Description                       |
|--------|---------------------------------------------------|-----------------------------------|
| POST   | `/api/user-courses`                              | Enroll a user in a course.        |
| GET    | `/api/user-courses/:userId`                      | Get all courses for a user.       |
| GET    | `/api/user-courses/:userId/:courseId`            | Get a specific user-course.       |
| PUT    | `/api/user-courses/:userId/:courseId/content-status` | Update content status.            |
| GET    | `/api/user-courses/:userId/:courseId/contents`   | Get filtered contents.            |
| PUT    | `/api/user-courses/:userId/:courseId/progress`   | Update progress.                  |
| GET    | `/api/user-courses/:userId/:courseId/notes`      | Get all notes.                    |
| POST   | `/api/user-courses/:userId/:courseId/notes`      | Add a note.                       |
| PUT    | `/api/user-courses/:userId/:courseId/notes/:noteId` | Edit a note.                      |
| DELETE | `/api/user-courses/:userId/:courseId/notes/:noteId` | Delete a note.                    |

---

## **Usage**

### **1. Run the Application**

After starting the development server, use tools like **ThunderClient** or **Postman** to test the API endpoints.

### **2. Sample Data**

- **User**: Create user profiles with detailed fields like address, contact, and LinkedIn links.
- **Course**: Add courses with parent topics and nested content.
- **User-Course**: Track user-specific progress, notes, and content status.

---
