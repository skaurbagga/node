# 🚀 Node.js Backend - Day 6 (Persistence Layer)

## 📌 Overview

This project demonstrates how to connect a Node.js backend to a MongoDB database using Mongoose and perform basic CRUD operations. It marks the transition from using temporary in-memory data to storing real data persistently.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 🔐 Environment Setup

Make sure MongoDB is running locally and your server is configured properly.

Example connection:

```js
mongodb://localhost:27017/my_backend_db
```

---

## 🗂️ Project Structure

```
project/
│── models/
│   └── User.js
│── db.js
│── index.js
│── package.json
```

---

## 🔗 API Endpoints

### 1. Create User

* **URL:** `/register`
* **Method:** `POST`
* **Description:** Saves a new user to the database

**Request Body:**

```json
{
  "username": "sahaj",
  "email": "sahaj@gmail.com",
  "age": 22
}
```

**Response:**

* `201 Created` → User successfully stored
* `400 Bad Request` → Error in input

---

### 2. Get All Users

* **URL:** `/users`
* **Method:** `GET`
* **Description:** Fetches all users from database

---

## 🧠 Key Learnings

* How to connect Node.js with MongoDB using Mongoose
* Importance of schemas and models
* How to handle POST requests and store data
* Understanding HTTP status codes (201, 400)
* Data flow: Request → Server → Database → Response

---

## 🧪 Testing

APIs were tested using tools like Postman.

---

## ⚠️ Notes

* Ensure MongoDB server is running before starting backend
* Do not store sensitive data (like passwords) in plain text
* Always validate incoming data

---

## ▶️ Run the Project

```bash
npm install
npx nodemon index.js
```

---

## 📊 Expected Output

* Data should be saved in MongoDB
* Can be viewed using MongoDB Compass
* API responses visible in Postman

---

## 🔥 Next Step

Implement password hashing using bcrypt and build full CRUD operations (Update & Delete).
