Setup Status

My setup is working properly. I installed Mongoose and connected my Node.js server to MongoDB successfully. The database is running locally, and I verified the connection using MongoDB Compass. My server is also running smoothly in Visual Studio Code.

---

Task Inventory

* Installed Mongoose to connect Node.js with MongoDB
* Created a database connection file (`db.js`)
* Connected the server to MongoDB
* Created a User schema and model
* Defined fields like username, email, age, and createdAt
* Built a POST API (`/register`) to store user data
* Learned how to save data into the database using `.save()`
* Created a GET API (`/users`) to fetch all users
* Tested APIs using Postman/Thunder Client
* Verified stored data using MongoDB Compass

---

Debugging Log

* **Error 1:** MongoDB connection failed initially
  **Solution:** I realized MongoDB server was not running. After starting the service, the connection worked.

* **Error 2:** Getting 404 Not Found in Postman
  **Solution:** I was running the wrong file and using incorrect route/method. After fixing the file being executed and using the correct POST route, the API worked.

---

Key Insights

The biggest “Aha!” moment was understanding how data actually flows from the frontend (or Postman) to the backend and then gets stored in the database. It made me realize how powerful backend systems are in managing real user data.

Another important learning was how schemas work as a blueprint. They ensure that the data stored in the database follows a proper structure, which prevents errors and keeps everything organized.

---

Documentation Notes

**What is Mongoose and why do we use it?**
Mongoose is a tool that helps Node.js communicate with MongoDB easily. It allows us to define schemas and models so that data stays structured and consistent.

**Difference between SQL and NoSQL:**

* SQL databases store data in tables (rows and columns)
* NoSQL databases like MongoDB store data in JSON-like documents

**HTTP Status Codes used:**

* `201 Created` → when a new user is successfully stored in database
* `400 Bad Request` → when there is an error in the request

---
