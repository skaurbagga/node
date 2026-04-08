Setup Status

Everything is working properly on my system. Visual Studio Code is running smoothly, Node.js is installed and able to run my server, and I was able to use the terminal without issues. My environment is ready for backend development.

---
Task Inventory

* Created a basic server using Express
* Learned how to create different routes like `/about`, `/user`, and `/api/users`
* Sent simple text responses using `res.send()`
* Sent structured data using `res.json()`
* Added middleware to log every request
* Created a dummy user data array to simulate a database
* Built an API endpoint to return user data
* Installed and used Nodemon for automatic server restart

---
Debugging Log

* **Error 1:** Server was not responding (page kept loading forever)
  **Solution:** I forgot to write `next()` in middleware. Adding it fixed the issue because it allowed the request to move forward.

* **Error 2:** Got “Cannot GET /” error in browser
  **Solution:** I realized I didn’t create a route for `/`. After adding a route like `app.get('/', ...)`, it worked.

---
Key Insights

The biggest “Aha!” moment was understanding middleware. I realized it works like a checkpoint or guard that every request passes through before reaching the final response. It helped me see how backend systems can handle logging, security, and validation in a clean way.
