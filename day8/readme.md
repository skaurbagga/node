# 🚀 Node.js Backend - Day 8 (Data Relationships & Population)

---

## 🔧 TECHNICAL SUMMARY

In this module, I implemented relationships between two MongoDB collections: **Users** and **Posts** using Mongoose.

* Created a **Post model** with a reference (`author`) to the User model using ObjectId
* Implemented **JWT-based authentication** to identify the logged-in user
* Built a protected route to create posts linked to the authenticated user
* Stored the user’s ID inside each post instead of embedding full user data
* Used Mongoose’s **populate()** method to fetch posts along with user details (username and email)
* Tested all APIs using Postman including authentication, post creation, and data retrieval

This setup mimics real-world backend systems where data is normalized and efficiently linked.

---

## 🐞 BUG LOG

* **Error 1: 401 Unauthorized (Token Missing/Invalid)**
  **Cause:** Token was either not passed in headers or incorrect format was used
  **Fix:** Added correct header `x-auth-token` with full JWT token value

* **Error 2: Author field storing null or incorrect value**
  **Cause:** JWT payload was not structured correctly or middleware not extracting user ID
  **Fix:** Ensured payload format `{ user: { id: user.id } }` and accessed via `req.user.id`

* **Error 3: populate() not working (author showing only ID)**
  **Cause:** Missing or incorrect `ref` in Post schema
  **Fix:** Added `ref: 'User'` in author field

* **Error 4: 404 Not Found during API testing**
  **Cause:** Wrong route path or incorrect HTTP method used
  **Fix:** Matched route definitions with correct method (GET/POST) and URL

---

## 🧠 CONCEPTUAL REFLECTION

The key learning from this module was understanding how **data relationships work in NoSQL databases**. Instead of embedding large amounts of data inside one document, references are used to keep the database efficient and scalable.

The most important concept was **populate()**, which acts like a bridge between collections by automatically replacing stored IDs with actual data. This made it clear how backend systems fetch meaningful information without duplicating data.

Another major takeaway was the role of **JWT authentication** in linking actions (like creating a post) to a specific user securely. It showed how authentication and database logic work together in real applications.

Overall, this module helped me understand how modern backend systems manage connected data and deliver structured responses to the frontend.
