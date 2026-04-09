Setup Status

My setup is fully working. I installed dotenv and confirmed that environment variables are loading correctly. The server is running properly using Node.js in Visual Studio Code, and I was able to test APIs using Postman/Thunder Client.

---
Task Inventory

* Installed dotenv package for environment variables
* Created a `.env` file to store PORT, API key, and DB URL
* Connected `.env` variables to my server using `process.env`
* Created a `/status` route to verify environment variables
* Learned and implemented controller pattern
* Created `controllers/userController.js` file
* Moved user logic from index.js to controller file
* Connected controller to route `/api/users`
* Enabled JSON body parsing using `express.json()`
* Created POST API `/api/register`
* Validated user input (username and password)
* Tested POST request using API testing tool
* Updated `.gitignore` to hide `.env` file

---
Debugging Log

* **Error 1:** Environment variables were showing as `undefined`
  **Solution:** I forgot to add `require('dotenv').config()` at the top of my file. After adding it, variables started working.

* **Error 2:** `req.body` was coming as undefined in POST request
  **Solution:** I had not added `app.use(express.json())`. After adding this middleware, the server was able to read request data.

---
 Key Insights

The biggest “Aha!” moment was understanding why `.env` files are used. I realized that storing sensitive data like API keys directly in code is risky, especially when pushing to GitHub. Using environment variables keeps the project secure and professional.

Another important learning was the controller pattern. It made me understand how large applications stay organized by separating routes from logic instead of writing everything in one file.

---
 Documentation Notes

**Why do we use `.env` instead of writing keys in code?**
We use `.env` files to keep sensitive information like API keys and database URLs safe. If we write them directly in code and push to GitHub, anyone can see them. `.env` keeps this data hidden and secure.

**HTTP Status Codes used today:**

* `201 Created` → when user is successfully registered
* `400 Bad Request` → when required data is missing
