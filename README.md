# Shopping Cart
A full-stack social media application using React, Redux, MongoDB, NodeJS, ExpressJS, JWT authentication, Firebase, Styled Components, and Stripe that allows
users to sign in, view products, filter products by different categories, add them to cart, and checkout using stripe. There is also an admin page that allows 
administrators to view users, products, and analytics like users per months as well as create, delete and edit products and users.


## Technologies

Frontend: Reactjs, Redux

Backend: Node.js, Mongodb, Mongoose, Express js

Authentication: Javascript Web Token (JWT)

Other tools: CryptoJS, Heroku, Firebase (for images), Styled Components, Stripe API, Redux-Persist


## Installation

Requirements: This project uses MongoDB, JWT, CryptoJS, and React Stripe, so you need to enter the keys into the appropriate .env file

1. Clone the repository or download the zip file and open on your editor.
2. Open the client and server folders and clone the .env.example folder and rename it to .env
3. In the server .env enter your MongoDB URI, desired port, CryptoJS secret key, Stripe secret key, and JWT secret key.
4. In the client .env enter your public Stripe key
5. On one terminal run cd server, npm install, npm start
6. Open another terminal and run cd client, npm install, npm start
7. On another terminal run cd admin, npm install, npm start

Note: If npm install doesn't work, please run npm install --force


## Credits and References
<a href="https://mui.com/material-ui/material-icons/?query=admin">Material UI</a>

<a href="https://cloud.mongodb.com/">MongoDB Atlas</a>

<a href="https://www.heroku.com/">Heroku</a>

<a href="https://www.youtube.com/c/LamaDev">Lamadev Youtube Channel</a>

<a href="https://jwt.io/introduction">JWT</a>

<a href="https://dashboard.stripe.com/test/dashboard">Stripe API</a>

<a href="https://console.firebase.google.com/">Firebase</a>



In Progress: Search bar to search for items, connecting shopping cart to the database to create orders, admin analytics for sales on each product per month.
